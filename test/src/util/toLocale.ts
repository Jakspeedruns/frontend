let lang = "en";
if (!lang) lang = document.documentElement.lang;

let langCode = "en-US";
if (lang.length === 2) langCode = `${lang}-${lang.toUpperCase()}`;
if (lang === "en") langCode = "en-US";
if (lang.length === 5) langCode = lang;

export function formatTime(time: string): string {
  let startDate = new Date();
  const offset = startDate.getTimezoneOffset();
  const timeArr = time.split(":");
  const BaseTime = `${offset / 60 + parseInt(timeArr[0], 10) / 1}:${
    timeArr[1]
  }`;
  let newTime = new Date("1970-01-01T" + BaseTime + "Z").toLocaleTimeString(
    langCode,
    {
      hour: "numeric",
      minute: "numeric",
    },
  );

  return newTime;
}

export function formatDate(date: Date): string {
  const newDate = date.toLocaleDateString(langCode, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return newDate;
}
