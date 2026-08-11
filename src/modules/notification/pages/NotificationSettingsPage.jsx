import React, { useEffect, useState } from "react";
import notificationService from "../services/notification.api";

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    marketing: false,
    follows: true,
    likes: true,
    comments: true,
    messages: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await notificationService.getSettings();
        if (res) {
          setSettings(res);
        }
      } catch (err) {
        console.error("Failed to load notification settings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      await notificationService.updateSettings(settings);
    } catch (err) {
      console.error("Failed to save notification settings", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-zinc-500">
        Loading notification settings...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
        Notification Settings
      </h1>

      <div className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </span>

            <button
              onClick={() => toggleSetting(key)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                value ? "bg-blue-600" : "bg-zinc-400"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                  value ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={saveSettings}
        disabled={saving}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default NotificationSettingsPage;