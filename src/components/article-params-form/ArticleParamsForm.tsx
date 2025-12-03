import { useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useCloseOnOutsideClickOrEsc } from 'src/hooks/useCloseOnOutsideClickOrEsc';
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

	// Используем кастомный хук для закрытия по клику вне или Esc
	useCloseOnOutsideClickOrEsc({
		isOpenElement: isOpen,
		elementRef: asideRef,
		onClose: onCloseForm,
	});

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
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
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

						{/* Размер шрифта - ОСТАЕТСЯ RadioGroup */}
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

						{/* Цвет шрифта - МЕНЯЕМ на Select */}
						<div className={styles.formSection}>
							<Select
								title='Цвет шрифта'
								selected={formParams.fontColor}
								options={fontColors}
								onChange={(option) => onFormChange('fontColor', option)}
								placeholder='Выберите цвет шрифта'
							/>
						</div>

						<Separator />

						{/* Цвет фона - МЕНЯЕМ на Select */}
						<div className={styles.formSection}>
							<Select
								title='Цвет фона'
								selected={formParams.backgroundColor}
								options={backgroundColors}
								onChange={(option) => onFormChange('backgroundColor', option)}
								placeholder='Выберите цвет фона'
							/>
						</div>

						<Separator />

						{/* Ширина контента - МЕНЯЕМ на Select */}
						<div className={styles.formSection}>
							<Select
								title='Ширина контента'
								selected={formParams.contentWidth}
								options={contentWidthArr}
								onChange={(option) => onFormChange('contentWidth', option)}
								placeholder='Выберите ширину'
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
