export const formGroupCss = `
.xoji-form-group {
	display: flex;
	flex-direction: column;
	gap: var(--space-1);
	font-family: var(--font-sans);
}
.xoji-form-group__label {
	display: inline-flex;
	align-items: center;
	gap: var(--space-1);
	font-size: var(--text-sm);
	font-weight: var(--weight-medium);
	color: var(--fg-1);
	line-height: var(--leading-normal);
}
.xoji-form-group__required {
	color: var(--danger);
	font-weight: var(--weight-semibold);
}
.xoji-form-group__description {
	font-size: var(--text-sm);
	line-height: var(--leading-normal);
	color: var(--fg-2);
}
.xoji-form-group__control {
	display: flex;
	flex-direction: column;
	gap: var(--space-1);
}
.xoji-form-group__error {
	display: flex;
	align-items: center;
	gap: var(--space-1);
	font-size: var(--text-sm);
	line-height: var(--leading-normal);
	color: var(--danger-text);
}
.xoji-form-group--sm {
	gap: var(--space-0);
}
.xoji-form-group--sm .xoji-form-group__label,
.xoji-form-group--sm .xoji-form-group__description,
.xoji-form-group--sm .xoji-form-group__error {
	font-size: var(--text-xs);
}
.xoji-form-group--lg {
	gap: var(--space-2);
}
.xoji-form-group--lg .xoji-form-group__label {
	font-size: var(--text-body);
}
.xoji-form-group--lg .xoji-form-group__description,
.xoji-form-group--lg .xoji-form-group__error {
	font-size: var(--text-body);
}
.xoji-form-group--invalid .xoji-form-group__label {
	color: var(--danger-text);
}
.xoji-form-group__label[hidden],
.xoji-form-group__description[hidden],
.xoji-form-group__error[hidden] {
	display: none;
}
`.trim();
