# National Days media

Drop each day's media here, named by the day's id (see src/content/national-days.ts):

  human-rights-day.webp / .mp4 / .mp3
  freedom-day.webp ...          youth-day.webp ...
  workers-day / mandela-day / womens-day / heritage-day / reconciliation-day

Then wire it in src/content/national-days.ts, e.g.
  image: require("../../assets/days/youth-day.webp"),

Images: 1376x768 webp matches the heritage-card ratio used across the app.
