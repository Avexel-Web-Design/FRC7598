import frcAPI from './frcApiClient';

export async function registerDeviceToken(token, platform = 'android') {
  if (!token) return false;
  try {
    const res = await frcAPI.post('/devices', { token, platform });
    return res.ok;
  } catch {
    return false;
  }
}

export async function removeDeviceToken(token) {
  try {
    const res = await frcAPI.request('DELETE', '/devices', { token });
    return res.ok;
  } catch {
    return false;
  }
}

// Optional: call this after login or on app start in Capacitor
export async function ensurePushRegistered(onToken) {
  try {
    const isNative = typeof window !== 'undefined' && !!window.Capacitor?.isNativePlatform?.();
    if (!isNative) return;
    const { PushNotifications } = await import('@capacitor/push-notifications');
    let perm = await PushNotifications.checkPermissions();
    if (perm.receive !== 'granted') {
      perm = await PushNotifications.requestPermissions();
      if (perm.receive !== 'granted') return;
    }
    await PushNotifications.register();
    return new Promise((resolve) => {
      const cleanup = () => {
        try {
          PushNotifications.removeAllListeners && PushNotifications.removeAllListeners();
        } catch {}
      };
      PushNotifications.addListener('registration', async (token) => {
        await registerDeviceToken(token.value, 'android');
        onToken && onToken(token.value);
        cleanup();
        resolve(true);
      });
      PushNotifications.addListener('registrationError', (err) => {
        console.error('Push registration error', err);
        cleanup();
        resolve(false);
      });
    });
  } catch (e) {
    // Non-native or plugin missing; ignore
  }
}
