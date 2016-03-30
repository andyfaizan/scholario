


var hasPermission = function (role) {
  return hasPermission[role] || (hasPermission[role] = function(req, res, next) {
    if (role !== req.user.role) {
      return res.status(401).json({
        err: 'Permission denied.',
      });
    }
    next();
  })
}

module.exports = {
  hasPermission: hasPermission,
};
