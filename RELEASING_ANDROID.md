# Android Release Guide

This document describes how to build and publish the Android app to Google Play.

## 1) One-time setup

- Choose final applicationId (e.g., `com.scaconstellations.app`)
  - Update in `android/app/build.gradle` (`defaultConfig.applicationId`)
  - Ensure `android/app/src/main/res/values/strings.xml` matches name/branding
- Firebase Cloud Messaging
  - In Firebase Console add Android app with the same package (applicationId)
  - Download `google-services.json` to `android/app/google-services.json`
- Signing
  - Create `android/keystore.properties` using `keystore.properties.example`
  - Opt in to Play App Signing in Play Console

## 2) Versioning

In `android/app/build.gradle`:
- `versionCode` (integer) – increment every release
- `versionName` (string) – human-readable (e.g., `1.0.0`)

## 3) Build the Android App Bundle (.aab)

Windows PowerShell from repo root:

```powershell
cd android
.\gradlew.bat clean
.\gradlew.bat bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

## 4) Play Console

- Create app → fill in details
- Upload `.aab` to Internal testing release
- Complete Store Listing and App Content (Data safety, Content rating)
- Rollout to testers; then promote to Production

## 5) Troubleshooting

- Upload rejected: bump `versionCode`
- FCM not working: check `google-services.json` matches `applicationId`
- Note: The privacy policy is maintained in the repository as `PRIVACY-POLICY.md`.
