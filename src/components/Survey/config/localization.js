import { localization } from "survey-creator-core";
import "survey-creator-core/survey-creator-core.i18n.js";

export const jaLocale = localization.getLocale("ja");
/*

schema:　https://github.com/surveyjs/survey-creator/blob/bc1a19a3789c057ba5bc924d5cdbcbd735edbdb4/packages/survey-creator-core/src/localization/japanese.ts

examples
jaLocale.ed.addNewQuestion = "Neue Frage";
jaLocale.ed.addNewTypeQuestion = "Neue {0}";
*/

localization.currentLocale = "ja";
