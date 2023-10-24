import en from "../translations/en.json";
import ru from "../translations/ru.json";
import config from "../config";

type Translation = {
	[key: string]: string;
};
type Translations = {
	[key: string]: Translation;
};
type TranslationParams = {
	[key: string]: string;
};

const translations: Translations = { en, ru };
const fallbackLanguageCode = config.fallbackLanguageCode;

const translate = (key: string, params: TranslationParams, languageCode?: string): string => {
	if (!languageCode || !translations[languageCode]) {
		languageCode = fallbackLanguageCode;
	}
	const translation = translations[languageCode];
	let message = translation[key] || "";
	if (params) {
		for (const paramName in params) {
			const placeholder = `{${paramName}}`;
			const paramValue = params[paramName];
			message = message.replace(placeholder, paramValue);
		}
	}
	return message;
};

export default translate;
