import { useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggleForm: () => void;
	onCloseForm: () => void;
	formParams: ArticleStateType;
	onFormChange: (field: keyof ArticleStateType, value: OptionType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggleForm,
	onCloseForm,
	formParams,
	onFormChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement>(null);

	// Закрытие формы при клике вне её
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;

			// Проверяем, кликнули ли мы на стрелку или её родительский элемент
			const isArrowButton = target.closest(
				'[role="button"][aria-label*="стрел"]'
			);
			const isArrowButtonParent = target.closest('[role="button"]');

			// Если клик был вне формы и не на стрелке - закрываем форму
			if (
				asideRef.current &&
				!asideRef.current.contains(target) &&
				!isArrowButton &&
				!isArrowButtonParent
			) {
				onCloseForm();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onCloseForm]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggleForm} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.formContent}>
						{/* Шрифт */}
						<div className={styles.formSection}>
							<Select
								title='Шрифт'
								selected={formParams.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={(option) => onFormChange('fontFamilyOption', option)}
								placeholder='Выберите шрифт'
							/>
						</div>

						<Separator />

						{/* Размер шрифта */}
						<div className={styles.formSection}>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={formParams.fontSizeOption}
								onChange={(option) => onFormChange('fontSizeOption', option)}
								title='Размер шрифта'
							/>
						</div>

						<Separator />

						{/* Цвет шрифта */}
						<div className={styles.formSection}>
							<RadioGroup
								name='fontColor'
								options={fontColors}
								selected={formParams.fontColor}
								onChange={(option) => onFormChange('fontColor', option)}
								title='Цвет шрифта'
							/>
						</div>

						<Separator />

						{/* Цвет фона */}
						<div className={styles.formSection}>
							<RadioGroup
								name='backgroundColor'
								options={backgroundColors}
								selected={formParams.backgroundColor}
								onChange={(option) => onFormChange('backgroundColor', option)}
								title='Цвет фона'
							/>
						</div>

						<Separator />

						{/* Ширина контента */}
						<div className={styles.formSection}>
							<RadioGroup
								name='contentWidth'
								options={contentWidthArr}
								selected={formParams.contentWidth}
								onChange={(option) => onFormChange('contentWidth', option)}
								title='Ширина контента'
							/>
						</div>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
