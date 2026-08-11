import { useEffect, useState } from "react";
import AdvertisementAPI from "../services/advertisement.api";

export default function useAdvertisements() {

  const [ads, setAds] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadAdvertisements = async () => {

    try {

      setLoading(true);

      const data = await AdvertisementAPI.getAll();

      setAds(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load advertisements."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadAdvertisements();

  }, []);

  return {

    ads,

    loading,

    error,

    refresh: loadAdvertisements

  };

}