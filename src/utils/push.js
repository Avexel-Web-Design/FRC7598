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
    return new Promise(async (resolve) => {
      let removeReg, removeErr;
      const cleanup = async () => {
        try { await removeReg?.remove?.(); } catch {}
        try { await removeErr?.remove?.(); } catch {}
      };
      const onReg = async (token) => {
        try { console.log('FCM push token:', token?.value); } catch {}
        await registerDeviceToken(token.value, 'android');
        onToken && onToken(token.value);
        await cleanup();
        resolve(true);
      };
      const onErr = async (err) => {
        console.error('Push registration error', err);
        await cleanup();
        resolve(false);
      };
      removeReg = await PushNotifications.addListener('registration', onReg);
      removeErr = await PushNotifications.addListener('registrationError', onErr);
      try {
        await PushNotifications.register();
      } catch (e) {
        await onErr(e);
      }
    });
  } catch (e) {
    // Non-native or plugin missing; ignore
  }
}
