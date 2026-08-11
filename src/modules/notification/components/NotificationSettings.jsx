import { useEffect, useState } from "react";
import { FiBell, FiMail, FiSmartphone } from "react-icons/fi";
import notificationApi from "../services/notification.api";

const NotificationSettings = () => {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    push: true,
    email: true,
    inApp: true,
    marketing: false,
    sound: true,
    vibration: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data } =
        await notificationApi.getSettings();

      if (data) {
        setSettings({
          ...settings,
          ...data,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const save = async (key, value) => {
    const updated = {
      ...settings,
      [key]: value,
    };

    setSettings(updated);

    try {
      await notificationApi.updateSettings(updated);
    } catch (err) {
      console.error(err);

      setSettings(settings);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">

      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FiBell />
          Notification Settings
        </h2>
      </div>

      <div className="divide-y">

        <SettingRow
          icon={<FiBell />}
          title="In-App Notifications"
          value={settings.inApp}
          onChange={(v) =>
            save("inApp", v)
          }
        />

        <SettingRow
          icon={<FiMail />}
          title="Email Notifications"
          value={settings.email}
          onChange={(v) =>
            save("email", v)
          }
        />

        <SettingRow
          icon={<FiSmartphone />}
          title="Push Notifications"
          value={settings.push}
          onChange={(v) =>
            save("push", v)
          }
        />

        <SettingRow
          icon={<FiBell />}
          title="Marketing Notifications"
          value={settings.marketing}
          onChange={(v) =>
            save("marketing", v)
          }
        />

        <SettingRow
          icon={<FiBell />}
          title="Notification Sound"
          value={settings.sound}
          onChange={(v) =>
            save("sound", v)
          }
        />

        <SettingRow
          icon={<FiSmartphone />}
          title="Vibration"
          value={settings.vibration}
          onChange={(v) =>
            save("vibration", v)
          }
        />

      </div>

    </div>
  );
};

const SettingRow = ({
  icon,
  title,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">

      <div className="flex items-center gap-3">
        <span className="text-xl text-blue-600">
          {icon}
        </span>

        <span className="font-medium">
          {title}
        </span>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">

        <input
          type="checkbox"
          checked={value}
          onChange={(e) =>
            onChange(e.target.checked)
          }
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />

      </label>

    </div>
  );
};

export default NotificationSettings;