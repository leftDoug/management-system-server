export const validateFields = (err, req, res, next) => {
  const errors = err.errors.map((error) => ({
    field: error.path,
    msg: error.message
  }));

  return res.status(400).json({
    ok: false,
    msg: errors[0].msg
  });
};
