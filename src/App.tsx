import { CSSProperties, useState, useCallback } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [appliedParams, setAppliedParams] =
		useState<ArticleStateType>(defaultArticleState);
	const [formParams, setFormParams] =
		useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const handleApply = useCallback(() => {
		setAppliedParams(formParams);
		setIsFormOpen(false);
	}, [formParams]);

	const handleReset = useCallback(() => {
		setFormParams(defaultArticleState);
		setAppliedParams(defaultArticleState);
		setIsFormOpen(false);
	}, []);

	const updateFormField = useCallback(
		(field: keyof ArticleStateType, value: OptionType) => {
			setFormParams((prev) => ({
				...prev,
				[field]: value,
			}));
		},
		[]
	);

	const toggleForm = useCallback(() => {
		if (!isFormOpen) {
			setFormParams(appliedParams);
		}
		setIsFormOpen((prev) => !prev);
	}, [isFormOpen, appliedParams]);

	const handleCloseForm = useCallback(() => {
		setIsFormOpen(false);
	}, []);

	return (
		<main
			className={styles.main} // Убрали clsx, т.к. только один класс
			style={
				{
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--container-width': appliedParams.contentWidth.value,
					'--bg-color': appliedParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isFormOpen}
				onToggleForm={toggleForm}
				onCloseForm={handleCloseForm}
				formParams={formParams}
				onFormChange={updateFormField}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
