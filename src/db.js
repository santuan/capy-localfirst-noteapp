import Dexie from "dexie";

export const db = new Dexie("DB");

db.version(1).stores({
  file: "++id, date, name",
  projects: "++id, date",
});
