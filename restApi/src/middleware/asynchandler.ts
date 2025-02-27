export const asynchandler = (cd) => async (req, res, next) => {
    try {
      await cd(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
