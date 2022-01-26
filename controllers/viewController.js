// IMPORT

// MIDDLEWARES

// HANDLERS
// TODO: Overview/homepage, tours/:slug, signin, login, signup, dashboard, /me,

// Overview/Homepage
export const overview = (req, res) => {
  res.status(200).render('pages/overview', {
    title: 'Tours Overview',
  });
};
