/**
 * Model helper functions to reduce code duplication in controllers
 */

/**
 * Get or upsert a singleton document in a collection
 * @param {import('mongoose').Model} Model - Mongoose model
 * @param {Object} updateData - Data to update if provided
 * @returns {Promise<import('mongoose').Document>}
 */
export const getSingleton = async (Model, updateData = null) => {
  if (updateData) {
    return await Model.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
  }

  return await Model.findOneAndUpdate(
    {},
    { $setOnInsert: {} },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
};

/**
 * Ensure default data exists in a collection if it's empty
 * @param {import('mongoose').Model} Model - Mongoose model
 * @param {Array<Object>} defaults - Array of default data objects
 * @returns {Promise<void>}
 */
export const ensureDefaults = async (Model, defaults) => {
  const count = await Model.countDocuments();
  if (count === 0) {
    await Model.insertMany(defaults, { ordered: true });
  }
};
