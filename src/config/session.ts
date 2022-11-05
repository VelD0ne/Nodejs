export default function configSession() {
  const { SESSION } = process.env;
  if (!SESSION) {
    throw new Error('There is no session key');
  }

  const config = {
    resave: false,
    saveUninitialized: false,
    secret: SESSION,
  };

  return config;
}
