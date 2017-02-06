export enum Routey {
  Login = -4,
  Signup = -3,
  Forgot = -2,
  LandingPage = -1,
    //scientific questions
  SenseOfCommunity = 0,
  Sociability,
  Wellbeing,
  //basic info
  BackgroundInfo,
  SchoolAndWork,

  //interests and activities
  Interests,
  Passion,
  Expertise,
  WillingToTeach,
  Group,
  GroupMethod,
  LookingForOthers,
  Places,
  Profile,
  Social,
}
export namespace Routey {
  export const stringMap = [
    'sense-of-community',
    'sociability',
    'wellbeing',

    'background-info',
    'school-and-work',

    'interests',
    'passions',
    'expertise',
    'willing-to-teach',
    'group',
    'group-method',
    'looking-for-others',
    'places',

    'profile',

    'social',
  ];
  export const urlMap = [
    '/sense-of-community',
    '/sociability',
    '/wellbeing',

    '/background-info',
    '/school-and-work',

    '/interests',
    '/passions',
    '/expertise',
    '/willing-to-teach',
    '/group',
    '/group-method',
    '/looking-for-others',
    '/places',

    '/profile',

    '/social',
  ];

  // export function section(route: Routesy) {
  //   switch (route) {
  //     case (Routey.BackgroundInfo | Routey.SchoolAndWork | Routey.SenseOfCommunity | Routey.Sociability | Routey.Wellbeing):
  //       return Sect.BasicInfo;
  //     case (Routey.Activities | Routey.Interests):
  //       return Sect.InterestsAndActivites;
  //     case (Routey.Expertise | Routey.Passion | Routey.LookingForOthers | Routey.Places | Routey.WillingToTeach):
  //       return Sect.PassionAndNeeds;
  //     default:
  //       return Sect.BasicInfo;
  //   }
  // };
  // export function secNum(route: Routesy): number {
  //   switch (Routey.section(route)) {
  //     case (Sect.BasicInfo):
  //       return 0;
  //     case (Sect.InterestsAndActivites):
  //       return 1;
  //     case (Sect.PassionAndNeeds):
  //       return 2;
  //     default:
  //       return 0;
  //   }
  // };
  export function name(route: Routey): string {
    switch (route) {
      case (-4):
        return 'login';
      case (-3):
        return 'signup';
      case (-2):
        return 'forgot';
      case (-1):
        return 'welcome';
      case  route > -1  && route < Routey.stringMap.length:
        return Routey.stringMap[route];
      default:
        return Routey.stringMap[route];
    }
  };
  export function indexToUrl(i: number): string {
    switch (i) {
      case (-4):
        return '/login';
      case (-3):
        return '/signup';
      case (-2):
        return '/forgot';
      case (-1):
        return '/welcome';
      case  i > -1  && i < Routey.stringMap.length:
        return Routey.urlMap[i];
      default:
        return Routey.urlMap[i];
    }
  };
  export function url(route: Routey): string {
    return '/' + Routey.name(route);
  };
  export function nameToEnum(url: string): Routey {
    switch (url) {
      case ('login'):
        return Routey[-4];
      case ('signup'):
        return Routey[-3];
      case ('forgot'):
        return Routey[-2];
      case ('welcome'):
        return Routey[-1];
      default:
        return Routey[Routey.stringMap.indexOf(url)];
    }
  };
  export function urlToEnum(url: string): Routey {
    switch (url) {
      case ('/login'):
        return Routey[-4];
      case ('/signup'):
        return Routey[-3];
      case ('/forgot'):
        return Routey[-2];
      case ('/welcome'):
        return Routey[-1];
      default:
        return Routey[Routey.urlMap.indexOf(url)];
    }
  };
  export function urlToIndex(url: string): number {
    switch (url) {
      case ('/login'):
        return -4;
      case ('/signup'):
        return -3;
      case ('/forgot'):
        return -2;
      case ('/welcome'):
        return -1;
      default:
        return Routey.urlMap.indexOf(url);
    }
  };
}
