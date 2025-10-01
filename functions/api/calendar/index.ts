import { Hono } from 'hono';
import { verify } from 'hono/jwt';

type Env = { DB: any; JWT_SECRET: string };
type JwtUser = { id: number; name: string; isAdmin: boolean };

const calendar = new Hono<{ Bindings: Env }>();

async function getAuthUser(c: any): Promise<JwtUser | null> {
  const auth = c.req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded = await verify(token, c.env.JWT_SECRET);
    return {
      id: Number((decoded as any).id),
      name: String((decoded as any).name || ''),
      isAdmin: !!(decoded as any).isAdmin,
    };
  } catch {
    return null;
  }
}

calendar.use('*', async (c, next) => {
  const user = await getAuthUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  c.set('user', user);
  await next();
});

// Utilities copied/adapted from 7790 to generate recurring instances
function generateRecurringInstances(baseEvent: any, startDate: Date, endDate: Date): any[] {
  if (!baseEvent.is_recurring) return [baseEvent];
  const instances: any[] = [];
  const eventStartDate = new Date(baseEvent.event_date + 'T00:00:00');
  let currentDate = new Date(Math.max(eventStartDate.getTime(), startDate.getTime()));
  let occurrenceCount = 0;
  const maxOccurrences = baseEvent.recurrence_occurrences || 1000;

  const config = {
    type: baseEvent.recurrence_type,
    interval: baseEvent.recurrence_interval || 1,
    daysOfWeek: baseEvent.recurrence_days_of_week ? JSON.parse(baseEvent.recurrence_days_of_week) : undefined,
    dayOfMonth: baseEvent.recurrence_day_of_month,
    weekOfMonth: baseEvent.recurrence_week_of_month,
    dayOfWeek: baseEvent.recurrence_day_of_week,
    months: baseEvent.recurrence_months ? JSON.parse(baseEvent.recurrence_months) : undefined,
    endType: baseEvent.recurrence_end_type || 'never',
    endDate: baseEvent.recurrence_end_date,
    occurrences: baseEvent.recurrence_occurrences,
    exceptions: baseEvent.recurrence_exceptions ? JSON.parse(baseEvent.recurrence_exceptions) : []
  } as any;

  while (currentDate <= endDate && occurrenceCount < maxOccurrences) {
    if (config.endType === 'end_date' && config.endDate) {
      const endDateObj = new Date(config.endDate + 'T00:00:00');
      if (currentDate > endDateObj) break;
    }

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    if (config.exceptions?.includes(dateStr)) {
      currentDate = getNextOccurrence(currentDate, config);
      continue;
    }

    if (isValidOccurrence(currentDate, eventStartDate, config)) {
      instances.push({
        ...baseEvent,
        id: `${baseEvent.id}_${dateStr}`,
        event_date: dateStr,
        parent_event_id: baseEvent.id,
        is_recurring_instance: true,
        is_recurring: 0,
      });
      occurrenceCount++;
    }
    currentDate = getNextOccurrence(currentDate, config);
  }
  return instances;
}

function isValidOccurrence(date: Date, startDate: Date, config: any): boolean {
  const daysDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  switch (config.type) {
    case 'daily':
      return daysDiff >= 0 && daysDiff % config.interval === 0;
    case 'weekly':
      if (daysDiff < 0) return false;
      const weeksDiff = Math.floor(daysDiff / 7);
      if (weeksDiff % config.interval !== 0) return false;
      if (config.daysOfWeek && config.daysOfWeek.length > 0) {
        const dayName = DAY_NAMES[date.getDay()];
        return config.daysOfWeek.includes(dayName);
      }
      return date.getDay() === startDate.getDay();
    case 'monthly':
      if (daysDiff < 0) return false;
      if (config.dayOfMonth) {
        const monthsDiff = (date.getFullYear() - startDate.getFullYear()) * 12 + (date.getMonth() - startDate.getMonth());
        if (monthsDiff % config.interval !== 0) return false;
        return date.getDate() === config.dayOfMonth;
      }
      return false;
    case 'yearly':
      if (daysDiff < 0) return false;
      const yearsDiff = date.getFullYear() - startDate.getFullYear();
      if (yearsDiff % config.interval !== 0) return false;
      if (config.months && config.months.length > 0) {
        return config.months.includes(date.getMonth() + 1) && date.getDate() === startDate.getDate();
      }
      return date.getMonth() === startDate.getMonth() && date.getDate() === startDate.getDate();
    default:
      return false;
  }
}

function getNextOccurrence(currentDate: Date, config: any): Date {
  const nextDate = new Date(currentDate);
  const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  switch (config.type) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + config.interval);
      break;
    case 'weekly':
      if (config.daysOfWeek && config.daysOfWeek.length > 1) {
        let found = false;
        for (let i = 1; i <= 7; i++) {
          const testDate = new Date(currentDate);
          testDate.setDate(testDate.getDate() + i);
          const dayName = DAY_NAMES[testDate.getDay()];
          if (config.daysOfWeek.includes(dayName)) { nextDate.setTime(testDate.getTime()); found = true; break; }
        }
        if (!found) nextDate.setDate(nextDate.getDate() + 7 * config.interval);
      } else {
        nextDate.setDate(nextDate.getDate() + 7 * config.interval);
      }
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + config.interval);
      break;
    case 'yearly':
      nextDate.setFullYear(nextDate.getFullYear() + config.interval);
      break;
    default:
      nextDate.setDate(nextDate.getDate() + 1);
  }
  return nextDate;
}

calendar.get('/', async (c) => {
  try {
    const startDate = c.req.query('start');
    const endDate = c.req.query('end');

    let query = `SELECT * FROM calendar_events WHERE (parent_event_id IS NULL OR parent_event_id = 0)`;
    if (startDate && endDate) {
      query += ` AND ((is_recurring = 0 AND event_date BETWEEN ? AND ?) OR (is_recurring = 1 AND (recurrence_end_date IS NULL OR recurrence_end_date >= ? OR event_date <= ?)))`;
    }
    query += ' ORDER BY event_date ASC, event_time ASC';
    const params = startDate && endDate ? [startDate, endDate, startDate, endDate] : [];
    const { results } = await c.env.DB.prepare(query).bind(...params).all();

    let standaloneInstances: any[] = [];
    if (startDate && endDate) {
      const { results: standalone } = await c.env.DB.prepare(`
        SELECT * FROM calendar_events 
        WHERE parent_event_id IS NOT NULL AND parent_event_id != 0 
        AND event_date BETWEEN ? AND ?
        ORDER BY event_date ASC, event_time ASC
      `).bind(startDate, endDate).all();
      standaloneInstances = standalone;
    }

    if (startDate && endDate) {
      const expanded: any[] = [];
      const start = new Date(startDate + 'T00:00:00');
      const end = new Date(endDate + 'T23:59:59');
      for (const event of results) {
        if (event.is_recurring) {
          expanded.push(...generateRecurringInstances(event, start, end));
        } else {
          expanded.push(event);
        }
      }
      expanded.push(...standaloneInstances);
      return c.json(expanded.sort((a, b) => {
        const dateA = new Date(a.event_date + ' ' + (a.event_time || '00:00'));
        const dateB = new Date(b.event_date + ' ' + (b.event_time || '00:00'));
        return dateA.getTime() - dateB.getTime();
      }));
    }
    return c.json(results);
  } catch (e) {
    console.error('Error fetching calendar events:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

calendar.post('/', async (c) => {
  try {
    const user = c.get('user') as JwtUser;
    const body = await c.req.json();
    const { title, description, event_date, event_time, event_end_time, location, is_recurring, recurrence } = body;
    if (!title || !event_date) return c.json({ error: 'Missing required fields: title, event_date' }, 400);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event_date)) return c.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, 400);
    if (event_time && !/^\d{2}:\d{2}$/.test(event_time)) return c.json({ error: 'Invalid time format. Use HH:MM' }, 400);
    if (event_end_time && !/^\d{2}:\d{2}$/.test(event_end_time)) return c.json({ error: 'Invalid end time format. Use HH:MM' }, 400);

    const rf = is_recurring && recurrence ? {
      is_recurring: 1,
      recurrence_type: recurrence.type,
      recurrence_interval: recurrence.interval || 1,
      recurrence_days_of_week: recurrence.daysOfWeek ? JSON.stringify(recurrence.daysOfWeek) : null,
      recurrence_day_of_month: recurrence.dayOfMonth || null,
      recurrence_week_of_month: recurrence.weekOfMonth || null,
      recurrence_day_of_week: recurrence.dayOfWeek || null,
      recurrence_months: recurrence.months ? JSON.stringify(recurrence.months) : null,
      recurrence_end_type: recurrence.endType || 'never',
      recurrence_end_date: recurrence.endDate || null,
      recurrence_occurrences: recurrence.occurrences || null,
      recurrence_exceptions: recurrence.exceptions ? JSON.stringify(recurrence.exceptions) : null,
    } : {
      is_recurring: 0,
      recurrence_type: null,
      recurrence_interval: null,
      recurrence_days_of_week: null,
      recurrence_day_of_month: null,
      recurrence_week_of_month: null,
      recurrence_day_of_week: null,
      recurrence_months: null,
      recurrence_end_type: null,
      recurrence_end_date: null,
      recurrence_occurrences: null,
      recurrence_exceptions: null,
    };

    const { success } = await c.env.DB.prepare(`
      INSERT INTO calendar_events (
        title, description, event_date, event_time, event_end_time, location, created_by,
        is_recurring, recurrence_type, recurrence_interval, recurrence_days_of_week,
        recurrence_day_of_month, recurrence_week_of_month, recurrence_day_of_week,
        recurrence_months, recurrence_end_type, recurrence_end_date,
        recurrence_occurrences, recurrence_exceptions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        title,
        description || null,
        event_date,
        event_time || null,
        event_end_time || null,
        location || null,
        user.id,
        rf.is_recurring,
        rf.recurrence_type,
        rf.recurrence_interval,
        rf.recurrence_days_of_week,
        rf.recurrence_day_of_month,
        rf.recurrence_week_of_month,
        rf.recurrence_day_of_week,
        rf.recurrence_months,
        rf.recurrence_end_type,
        rf.recurrence_end_date,
        rf.recurrence_occurrences,
        rf.recurrence_exceptions,
      ).run();

    if (success) return c.json({ message: 'Event created successfully' });
    return c.json({ error: 'Failed to create event' }, 500);
  } catch (e) {
    console.error('Error creating event:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

calendar.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const row = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE id = ?').bind(id).first();
    if (!row) return c.json({ error: 'Event not found' }, 404);
    return c.json(row);
  } catch (e) {
    console.error('Error fetching event:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

calendar.put('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const { title, description, event_date, event_time, event_end_time, location, is_recurring, recurrence, update_series, original_instance_date } = body;

    if (!title || !event_date) return c.json({ error: 'Missing required fields: title, event_date' }, 400);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event_date)) return c.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, 400);
    if (event_time && !/^\d{2}:\d{2}$/.test(event_time)) return c.json({ error: 'Invalid time format. Use HH:MM' }, 400);
    if (event_end_time && !/^\d{2}:\d{2}$/.test(event_end_time)) return c.json({ error: 'Invalid end time format. Use HH:MM' }, 400);

    const existing = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE id = ?').bind(id).first();
    if (!existing) return c.json({ error: 'Event not found' }, 404);

    if (original_instance_date && !update_series) {
      // Editing a single instance: create/update standalone and add exception to parent
      const existingStandalone = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE parent_event_id = ? AND event_date = ?')
        .bind(id, original_instance_date)
        .first();
      if (existingStandalone) {
        const { success } = await c.env.DB.prepare(`
          UPDATE calendar_events SET title=?, description=?, event_date=?, event_time=?, event_end_time=?, location=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
        `).bind(title, description || null, event_date, event_time || null, event_end_time || null, location || null, existingStandalone.id).run();
        return success ? c.json({ message: 'Recurring instance updated successfully' }) : c.json({ error: 'Failed to update recurring instance' }, 500);
      } else {
        const exceptions = existing.recurrence_exceptions ? JSON.parse(existing.recurrence_exceptions as string) : [];
        if (!exceptions.includes(original_instance_date)) exceptions.push(original_instance_date);
        await c.env.DB.prepare('UPDATE calendar_events SET recurrence_exceptions = ?, updated_at=CURRENT_TIMESTAMP WHERE id = ?')
          .bind(JSON.stringify(exceptions), id)
          .run();
        const { success } = await c.env.DB.prepare(`
          INSERT INTO calendar_events (title, description, event_date, event_time, event_end_time, location, created_by, is_recurring, parent_event_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
        `).bind(title, description || null, event_date, event_time || null, event_end_time || null, location || null, existing.created_by, id).run();
        return success ? c.json({ message: 'Recurring instance updated successfully' }) : c.json({ error: 'Failed to update recurring instance' }, 500);
      }
    } else {
      const rf = is_recurring && recurrence ? {
        is_recurring: 1,
        recurrence_type: recurrence.type,
        recurrence_interval: recurrence.interval || 1,
        recurrence_days_of_week: recurrence.daysOfWeek ? JSON.stringify(recurrence.daysOfWeek) : null,
        recurrence_day_of_month: recurrence.dayOfMonth || null,
        recurrence_week_of_month: recurrence.weekOfMonth || null,
        recurrence_day_of_week: recurrence.dayOfWeek || null,
        recurrence_months: recurrence.months ? JSON.stringify(recurrence.months) : null,
        recurrence_end_type: recurrence.endType || 'never',
        recurrence_end_date: recurrence.endDate || null,
        recurrence_occurrences: recurrence.occurrences || null,
        recurrence_exceptions: existing.recurrence_exceptions,
      } : {
        is_recurring: 0,
        recurrence_type: null,
        recurrence_interval: null,
        recurrence_days_of_week: null,
        recurrence_day_of_month: null,
        recurrence_week_of_month: null,
        recurrence_day_of_week: null,
        recurrence_months: null,
        recurrence_end_type: null,
        recurrence_end_date: null,
        recurrence_occurrences: null,
        recurrence_exceptions: null,
      };

      const { success } = await c.env.DB.prepare(`
        UPDATE calendar_events SET 
          title=?, description=?, event_time=?, event_end_time=?, location=?, updated_at=CURRENT_TIMESTAMP,
          is_recurring=?, recurrence_type=?, recurrence_interval=?, recurrence_days_of_week=?,
          recurrence_day_of_month=?, recurrence_week_of_month=?, recurrence_day_of_week=?,
          recurrence_months=?, recurrence_end_type=?, recurrence_end_date=?, recurrence_occurrences=?, recurrence_exceptions=?
        WHERE id=?
      `).bind(
        title, description || null, event_time || null, event_end_time || null, location || null,
        rf.is_recurring, rf.recurrence_type, rf.recurrence_interval, rf.recurrence_days_of_week,
        rf.recurrence_day_of_month, rf.recurrence_week_of_month, rf.recurrence_day_of_week,
        rf.recurrence_months, rf.recurrence_end_type, rf.recurrence_end_date, rf.recurrence_occurrences, rf.recurrence_exceptions,
        id
      ).run();
      return success ? c.json({ message: 'Event updated successfully' }) : c.json({ error: 'Failed to update event' }, 500);
    }
  } catch (e) {
    console.error('Error updating event:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

calendar.delete('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const { delete_series, exception_date } = await c.req.json().catch(() => ({}));
    const existing = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE id = ?').bind(id).first();
    if (!existing) return c.json({ error: 'Event not found' }, 404);

    if (exception_date && !delete_series) {
      const parentId = existing.parent_event_id || id;
      const parent = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE id = ?').bind(parentId).first();
      if (parent) {
        const exceptions = parent.recurrence_exceptions ? JSON.parse(parent.recurrence_exceptions as string) : [];
        if (!exceptions.includes(exception_date)) exceptions.push(exception_date);
        await c.env.DB.prepare('UPDATE calendar_events SET recurrence_exceptions = ? WHERE id = ?')
          .bind(JSON.stringify(exceptions), parentId)
          .run();
        return c.json({ message: 'Event occurrence deleted successfully' });
      }
    }

    if (delete_series) {
      const { success } = await c.env.DB.prepare('DELETE FROM calendar_events WHERE id = ?').bind(id).run();
      if (success) {
        await c.env.DB.prepare('DELETE FROM calendar_events WHERE parent_event_id = ?').bind(id).run();
        return c.json({ message: 'Event series deleted successfully' });
      }
    } else {
      const { success } = await c.env.DB.prepare('DELETE FROM calendar_events WHERE id = ?').bind(id).run();
      if (success) return c.json({ message: 'Event deleted successfully' });
    }
    return c.json({ error: 'Failed to delete event' }, 500);
  } catch (e) {
    console.error('Error deleting event:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

calendar.post('/:id/exception', async (c) => {
  try {
    const { id } = c.req.param();
    const { exception_date } = await c.req.json();
    if (!exception_date) return c.json({ error: 'Missing required field: exception_date' }, 400);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(exception_date)) return c.json({ error: 'Invalid date format. Use YYYY-MM-DD' }, 400);
    const event = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE id = ?').bind(id).first();
    if (!event) return c.json({ error: 'Event not found' }, 404);
    if (!event.is_recurring) return c.json({ error: 'Event is not recurring' }, 400);
    const exceptions = event.recurrence_exceptions ? JSON.parse(event.recurrence_exceptions as string) : [];
    if (!exceptions.includes(exception_date)) exceptions.push(exception_date);
    const { success } = await c.env.DB.prepare('UPDATE calendar_events SET recurrence_exceptions = ? WHERE id = ?')
      .bind(JSON.stringify(exceptions), id).run();
    return success ? c.json({ message: 'Exception added successfully' }) : c.json({ error: 'Failed to add exception' }, 500);
  } catch (e) {
    console.error('Error adding exception:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

calendar.delete('/:id/exception', async (c) => {
  try {
    const { id } = c.req.param();
    const { exception_date } = await c.req.json();
    if (!exception_date) return c.json({ error: 'Missing required field: exception_date' }, 400);
    const event = await c.env.DB.prepare('SELECT * FROM calendar_events WHERE id = ?').bind(id).first();
    if (!event) return c.json({ error: 'Event not found' }, 404);
    if (!event.is_recurring) return c.json({ error: 'Event is not recurring' }, 400);
    const exceptions = event.recurrence_exceptions ? JSON.parse(event.recurrence_exceptions as string) : [];
    const updated = exceptions.filter((d: string) => d !== exception_date);
    const { success } = await c.env.DB.prepare('UPDATE calendar_events SET recurrence_exceptions = ? WHERE id = ?')
      .bind(JSON.stringify(updated), id).run();
    return success ? c.json({ message: 'Exception removed successfully' }) : c.json({ error: 'Failed to remove exception' }, 500);
  } catch (e) {
    console.error('Error removing exception:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default calendar;
