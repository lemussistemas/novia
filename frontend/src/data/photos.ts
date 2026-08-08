export type PhotoItem = {
  id: number;
  src: string;
  alt: string;
};

export const COUPLE_PHOTOS: PhotoItem[] = Array.from({ length: 18 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    src: `/photos/photo-${n}.png`,
    alt: `Momento ${i + 1} juntos`,
  };
});

export const LOVE_MESSAGES = [
  {
    title: "Desde el primer instante",
    text: "Había algo en ti que me hizo querer quedarme. No fue ruido… fue paz.",
  },
  {
    title: "Tus ojos",
    text: "Cuando me miras, el mundo baja la velocidad. Y yo solo quiero quedarme ahí.",
  },
  {
    title: "Nuestras risas",
    text: "Me encanta cómo convertimos lo simple en recuerdo. Un café, solo estar abrazados, una foto… y ya somos historia.",
  },
  {
    title: "Tu forma de ser",
    text: "Admiro tu fuerza, tu ternura y esa luz que dejas donde llegas. Contigo todo se siente más verdadero.",
  },
  {
    title: "Los días contigo",
    text: "No necesito un plan perfecto. Contigo, cualquier momento se vuelve mi favorito.",
  },
  {
    title: "Lo que siento",
    text: "No es solo cariño. Es ganas de cuidarte, de elegirte y de construir algo bonito a tu lado.",
  },
  {
    title: "Por eso hoy…",
    text: "Quiero preguntarte algo con el corazón abierto, sin prisa y con toda la intención.",
  },
];

export const SCROLL_TEASES = [
  "Y sabes qué…",
  "Pues baja un poquito más",
  "Sí, más abajo todavía",
  "No te detengas ahora",
  "Sigue bajando…",
  "Un poquito más…",
  "Casi… pero todavía no",
  "Sigue, sigue, sigue",
  "Estás cerca…",
  "Casi llegas",
  "Un último empujoncito",
  "Ya casi, ya casi…",
  "Muy cerca del secreto",
  "Baja tantito más",
  "Ok… ahora sí",
];
