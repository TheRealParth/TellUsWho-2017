import {Injectable}       from '@angular/core';
import {stateOptions}       from '../options/stateOptions';
import {countryOptions}       from '../options/countryOptions';
import {genderOptions}       from '../options/genderOptions';
import {nationalityOptions}       from '../options/nationalityOptions';
import {languageOptions}       from '../options/languageOptions';
import {relationshipOptions}       from '../options/relationshipOptions';
import {orientationOptions}       from '../options/orientationOptions';
import {graduateOptions, undergraduateOptions} from "../options/majorOptions";
import {campusOptions} from "../options/campusOptions";
import {livewithOptions} from "../options/livewith";
import {ethnicityOptions} from "../options/ethnicityOptions";


@Injectable()

export class OptionService {
  get verbs(){
    return ["Watch",
      "Listen",
      "Play",
      "Attend",
      "Go",
      "Visit",
      "discuss",
      "make",
      "write",
      "teach",
      "learn",
      "Eat/Drink",
      "n/a",];
  }
  get ethnicityOptions(){
    return ethnicityOptions;
  }
	get stateOptions() {
		return stateOptions;
	}
  get graduateOptions() {
    return graduateOptions;
  }
  get undergraduateOptions() {
    return undergraduateOptions;
  }
  get campusOptions() {
    return campusOptions;
  }
  get livewithOptions() {
    return livewithOptions;
  }
	get countryOptions() {
		return countryOptions;
	}

	get genderOptions() {
		return genderOptions;
	}

	get nationalityOptions() {
		return nationalityOptions;

	}

	get languageOptions() {
		return languageOptions;

	}

	get relationshipOptions() {
		return relationshipOptions;
	}

	get orientationOptions() {
		return orientationOptions;

	}

}
