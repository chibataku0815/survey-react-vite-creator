import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { creatorOptions } from "./config/creatorOptions";
// import "./index.css";
import './config/localization';

function SurveyComponent() {
    const creator = new SurveyCreator(creatorOptions);

    return (<SurveyCreatorComponent creator={creator} />);
}

export default SurveyComponent;
