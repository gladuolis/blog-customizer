import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useCallback } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// 1. Текущие примененные настройки (то, что видно на статье)
	const [appliedParams, setAppliedParams] =
		useState<ArticleStateType>(defaultArticleState);

	// 2. Состояние формы (то, что видит пользователь в форме)
	const [formParams, setFormParams] =
		useState<ArticleStateType>(defaultArticleState);

	// 3. Открыта ли форма
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	// Функция для применения настроек
	const handleApply = useCallback(() => {
		setAppliedParams(formParams);
		setIsFormOpen(false);
	}, [formParams]);

	// Функция для сброса настроек
	const handleReset = useCallback(() => {
		setFormParams(defaultArticleState);
		setAppliedParams(defaultArticleState);
		setIsFormOpen(false);
	}, []);

	// Функция для обновления поля в форме
	const updateFormField = useCallback(
		(field: keyof ArticleStateType, value: OptionType) => {
			setFormParams((prev) => ({
				...prev,
				[field]: value,
			}));
		},
		[]
	);

	// Функция открытия/закрытия формы
	const toggleForm = useCallback(() => {
		if (!isFormOpen) {
			// При открытии копируем текущие примененные настройки в форму
			setFormParams(appliedParams);
		}
		setIsFormOpen((prev) => !prev);
	}, [isFormOpen, appliedParams]);

	// Функция закрытия формы
	const handleCloseForm = useCallback(() => {
		setIsFormOpen(false);
	}, []);

	return (
		<main
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
