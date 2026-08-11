// modules/marketplace/services/marketplace.api.js

import api from "../../../config/api";

const BASE = "/marketplace";

/**
 * ==========================================================
 * CREATE LISTING
 * POST /api/marketplace
 * ==========================================================
 */
export const createMarketplace = async (payload) => {
  const { data } = await api.post(BASE, payload);
  return data;
};

/**
 * ==========================================================
 * GET ALL LISTINGS
 * GET /api/marketplace
 * ==========================================================
 */
export const getMarketplace = async (params = {}) => {
  const { data } = await api.get(BASE, {
    params,
  });

  return data;
};

/**
 * ==========================================================
 * GET MY LISTINGS
 * GET /api/marketplace/my
 * ==========================================================
 */
export const getMyMarketplace = async () => {
  const { data } = await api.get(`${BASE}/my`);
  return data;
};

/**
 * ==========================================================
 * GET SINGLE LISTING
 * GET /api/marketplace/:id
 * ==========================================================
 */
export const getMarketplaceById = async (id) => {
  const { data } = await api.get(`${BASE}/${id}`);
  return data;
};

/**
 * ==========================================================
 * UPDATE LISTING
 * PATCH /api/marketplace/:id
 * ==========================================================
 */
export const updateMarketplace = async (
  id,
  payload
) => {
  const { data } = await api.patch(
    `${BASE}/${id}`,
    payload
  );

  return data;
};

/**
 * ==========================================================
 * DELETE LISTING
 * DELETE /api/marketplace/:id
 * ==========================================================
 */
export const deleteMarketplace = async (
  id
) => {
  const { data } = await api.delete(
    `${BASE}/${id}`
  );

  return data;
};

/**
 * ==========================================================
 * APPLY TO LISTING
 * POST /api/marketplace/:id/apply
 * ==========================================================
 */
export const applyMarketplace = async (
  id,
  payload
) => {
  const { data } = await api.post(
    `${BASE}/${id}/apply`,
    payload
  );

  return data;
};

/**
 * ==========================================================
 * GET APPLICATIONS
 * GET /api/marketplace/:id/applications
 * ==========================================================
 */
export const getMarketplaceApplications =
async (id) => {

  const { data } =
    await api.get(
      `${BASE}/${id}/applications`
    );

  return data;

};

/**
 * ==========================================================
 * DEFAULT EXPORT
 * ==========================================================
 */

export default {

  createMarketplace,

  getMarketplace,

  getMyMarketplace,

  getMarketplaceById,

  updateMarketplace,

  deleteMarketplace,

  applyMarketplace,

  getMarketplaceApplications

};