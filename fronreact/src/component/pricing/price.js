export const prices = {
  p1: {
    id: {
      m: "STRIPE_PR_1M",
      y: "STRIPE_PR_1Y",
    },
    title: "Basic",
    pMonth: {
      fPrice: 199,
      lPrice: 99,
    },
    pYear: {
      fPrice: 999,
      lPrice: 799,
    },
    desc: [
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
    ],
  },
  p2: {
    id: {
      m: "STRIPE_PR_2M",
      y: "STRIPE_PR_2Y",
    },
    title: "Plus",
    pMonth: {
      fPrice: 299,
      lPrice: 199,
    },
    pYear: {
      fPrice: 1999,
      lPrice: 1399,
    },
    desc: [
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
    ],
  },
  p3: {
    id: {
      m: "STRIPE_PR_3M",
      y: "STRIPE_PR_3Y",
    },
    title: "Primium",
    pMonth: {
      fPrice: 499,
      lPrice: 399,
    },
    pYear: {
      fPrice: 3999,
      lPrice: 2099,
    },
    desc: [
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
      "test 11 kl,rnzgjkehn lknjefibzhgjr",
    ],
  },
};

export const checkMember = function (sub) {
  let r = 0;
  if (sub && sub.length > 0) {
    sub.forEach(function (i) {
      switch (i.price) {
        case prices.p1.id.m:
          if (r < 1) r = 1;
          break;
        case prices.p1.id.y:
          if (r < 1) r = 1;
          break;

        case prices.p2.id.m:
          if (r < 2) r = 2;
          break;
        case prices.p2.id.y:
          if (r < 2) r = 2;
          break;

        case prices.p3.id.m:
          if (r < 3) r = 3;
          break;
        case prices.p3.id.y:
          if (r < 3) r = 3;
          break;

        default:
          break;
      }
    });
  }
  return r;
};
