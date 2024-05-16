import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
// import { useState } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface PropsArrowButton {
	toggleOpenFunc: OnClick;
	openState: boolean;
}

export const ArrowButton = ({
	toggleOpenFunc,
	openState,
}: PropsArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={toggleOpenFunc}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: openState,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: openState,
				})}
			/>
		</div>
	);
};
