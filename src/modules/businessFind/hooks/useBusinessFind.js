import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../../../config/api";

import {
  setLoading,
  setCampaigns,
  setCurrentCampaign,
  setStats,
  setError,
  addCampaign,
  updateCampaign,
  removeCampaign,
} from "../store/businessFindSlice";

import {
  selectCampaigns,
  selectCurrentCampaign,
  selectBusinessFindLoading,
  selectBusinessFindError,
  selectBusinessFindStats,
} from "../store/businessFindSelectors";

const useBusinessFind = () => {
  const dispatch = useDispatch();

  const campaigns = useSelector(selectCampaigns);
  const currentCampaign = useSelector(selectCurrentCampaign);
  const stats = useSelector(selectBusinessFindStats);
  const loading = useSelector(selectBusinessFindLoading);
  const error = useSelector(selectBusinessFindError);

  const request = async (callback) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await callback();
    } catch (err) {
      dispatch(
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Business Find request failed"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadMyCampaigns = useCallback(async () => {
    await request(async () => {
      const { data } = await api.get("/business-find/my");
      dispatch(setCampaigns(data));
    });
  }, [dispatch]);

  const loadCampaign = useCallback(
    async (id) => {
      await request(async () => {
        const { data } = await api.get(`/business-find/${id}`);
        dispatch(setCurrentCampaign(data));
      });
    },
    [dispatch]
  );

  const createCampaign = useCallback(
    async (payload) => {
      return request(async () => {
        const { data } = await api.post("/business-find", payload);
        dispatch(addCampaign(data));
        return data;
      });
    },
    [dispatch]
  );

  const updateStatus = useCallback(
    async (id, status) => {
      return request(async () => {
        const { data } = await api.patch(
          `/business-find/${id}/status`,
          { status }
        );

        dispatch(updateCampaign(data));
        dispatch(setCurrentCampaign(data));

        return data;
      });
    },
    [dispatch]
  );

  const apply = useCallback(async (id, payload) => {
    return request(async () => {
      const { data } = await api.post(
        `/business-find/${id}/apply`,
        payload
      );

      return data;
    });
  }, []);

  const deleteCampaign = useCallback(
    async (id) => {
      return request(async () => {
        await api.delete(`/business-find/${id}`);
        dispatch(removeCampaign(id));
      });
    },
    [dispatch]
  );

  const loadStats = useCallback(async () => {
    await request(async () => {
      const { data } = await api.get("/business-find/stats");
      dispatch(setStats(data));
    });
  }, [dispatch]);

  useEffect(() => {
    loadMyCampaigns();
  }, [loadMyCampaigns]);

  return {
    campaigns,
    currentCampaign,
    stats,
    loading,
    error,

    loadMyCampaigns,
    loadCampaign,
    createCampaign,
    updateStatus,
    apply,
    deleteCampaign,
    loadStats,
  };
};

export default useBusinessFind;