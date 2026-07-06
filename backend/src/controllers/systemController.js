export const getHealth = (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
};

export const getVersion = (_req, res) => {
  res.status(200).json({
    projectName: 'City Smile Dental Clinic',
    apiVersion: '1.0.0',
    nodeVersion: process.version,
  });
};
