import React from 'react';

const BaseTheme = (colors) => ({
    typography: {
        fontFamily: ['"Source Sans Pro",sans-serif'],
    },
    props: {
        MuiInput: {
            disableUnderline: true,
        },
        MuiInputMultiline: {
            spellcheck: 'false',
        },
        MuiInputLabel: {
            shrink: true,
            focused: false,
        },
        MuiButton: {
            fullWidth: true,
            disableTouchRipple: true,
            disableRipple: true,
            disableElevation: true,
        },
        MuiIconButton: {
            disableTouchRipple: true,
            focusRipple: false,
        },
        MuiPopover: {
            TransitionProps: {
                timeout: 0,
            },
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        backgroundColor: colors.background,
                    },
                },
            },
            MuiTextField: {
                root: {
                    width: '100%',
                },
            },
            MuiInputLabel: {
                root: {
                    color: 'var(--milled-wine)',
                    fontSize: '18px',
                    marginBottom: '10px',
                    fontWeight: '600',
                    '&$error': {
                        color: 'var(--milled-wine)',
                    },
                    width: 'max-content',
                },
                formControl: {
                    top: '-10px',
                },
            },
            MuiInput: {
                root: {
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '10px',
                    height: '40px',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    caretColor: colors.primary,
                    '&$error': {
                        border: `1px solid ${colors.error}`,
                    },
                    '&$focused': {
                        boxShadow: `0 0 2px ${colors.focus}`,
                    },
                    '&$error$focused': {
                        boxShadow: `0 0 2px ${colors.error}`,
                    },
                },
            },
            MuiInputBase: {
                multiline: {
                    height: 'auto !important',
                },
            },
            MuiSelect: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
                icon: {
                    position: 'absolute',
                    right: '10px',
                    pointerEvents: 'none',
                },
            },
            MuiAutocomplete: {
                root: {
                    '& button': {
                        '&:hover': {
                            background: 'transparent',
                        },
                    },
                },
                input: {
                    cursor: 'pointer',
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
                inputRoot: {
                    display: 'inline-flex',
                    flexWrap: 'initial',
                    padding: '10px !important',
                },
                popupIndicator: {
                    right: '10px',
                },
                clearIndicator: {
                    color: 'var(--spun-pearl)',
                    right: '10px',
                },
            },
            MuiCheckbox: {
                root: {
                    margin: '0 20px 0 0',
                    padding: 0,
                    '& :focus ~ svg': {
                        boxShadow: `0 0 2px ${colors.focus}`,
                    },
                },
            },
            MuiButton: {
                root: {
                    minHeight: '46px',
                    fontSize: '16px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: colors.hover,
                    },
                },
                containedPrimary: {
                    boxShadow: 'none',
                    backgroundColor: colors.primary,
                    '&:hover': {
                        backgroundColor: colors.hover,
                    },
                    '&:focus': {
                        backgroundColor: colors.primary,
                        boxShadow: `0 0 2px ${colors.focus} !important`,
                    },
                    '&:active': {
                        backgroundColor: colors.active,
                        boxShadow: 'none',
                    },
                    '&$disabled': {
                        backgroundColor: colors.primary,
                        opacity: 0.2,
                        color: 'white',
                    },
                },
                containedSecondary: {
                    boxShadow: 'none',
                    border: '1px solid var(--ghost-white)',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    color: colors.primary,
                    '&:focus': {
                        backgroundColor: 'white',
                        boxShadow: `0 0 2px ${colors.focus}`,
                        color: colors.primary,
                    },
                    '&:hover': {
                        backgroundColor: 'white',
                        color: colors.hover,
                        opacity: 0.75,
                    },
                    '&:active': {
                        backgroundColor: 'white',
                        color: colors.primary,
                        boxShadow: 'none',
                        opacity: 0.75,
                    },
                    '&$disabled': {
                        opacity: 0.2,
                        color: 'white',
                    },
                },
            },
            MuiFormHelperText: {
                root: {
                    '&$error': {
                        position: 'absolute',
                        bottom: '-15px',
                        right: 0,
                        color: colors.error,
                    },
                },
            },
            MuiDivider: {
                root: {
                    height: '1px',
                    backgroundColor: 'var(--gainsboro)',
                    width: '100%',
                },
            },
            MuiTypography: {
                h6: {
                    fontSize: '24px',
                    fontWeight: '600',
                },
            },
            MuiDialog: {
                paper: {
                    width: '445px',
                    borderRadius: 0,
                },
            },
            MuiDialogTitle: {
                root: {
                    padding: '40px 40px 32px 40px',
                },
            },
            MuiDialogContent: {
                root: {
                    padding: '0 40px',
                    fontSize: '16px',
                    color: 'var(--spun-pearl)',
                    lineHeight: '27px',
                    whiteSpace: 'pre-line',
                    position: 'relative',
                },
            },
            MuiDialogActions: {
                root: {
                    padding: '40px',
                },
            },
            MuiAppBar: {
                root: {
                    zIndex: 1000,
                    minHeight: '100px',
                    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
                },
            },
            MuiToolbar: {
                regular: {
                    padding: '30px 50px',
                    minHeight: '100px !important',
                    background: 'white',
                    boxShadow: 'none',
                },
            },
            MuiTooltip: {
                arrow: {
                    color: colors.primary,
                },
                tooltip: {
                    backgroundColor: colors.primary,
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '16px',
                    lineHeight: '20px',
                    padding: '15px',
                },
            },
            MuiDrawer: {
                root: {
                    width: '275px',
                },
                paper: {
                    width: '275px',
                    zIndex: 900,
                },
            },
            MuiList: {
                root: {
                    height: '100%',
                },
                padding: {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
            MuiRadio: {
                root: {
                    '&$checked': {
                        color: `${colors.primary} !important`,
                    },
                },
            },
            MuiListItem: {
                root: {
                    '&$selected': {
                        background: 'transparent',
                        fontWeight: '600',
                        '&:hover': {
                            background: 'transparent',
                        },
                    },
                    '&:focus': {
                        boxShadow: `0 0 2px ${colors.focus}`,
                        background: 'transparent',
                    },
                    '& .MuiTouchRipple-root': {
                        color: colors.focus,
                    },
                },
                button: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
            },
            MuiIconButton: {
                root: {
                    color: colors.primary,
                    '&:focus': {
                        boxShadow: `0 0 2px ${colors.focus}`,
                    },
                    '&:hover': {
                        backgroundColor: colors.hover,
                    },
                },
            },
            MuiDrawerItem: {
                root: {
                    '&.Mui-selected': {
                        fill: colors.primary,
                        color: colors.primary,
                        '& .selectedDivider': {
                            backgroundColor: colors.primary,
                        },
                        '& .icon': {
                            fill: colors.primary,
                        },
                    },
                    '& .listText': {
                        opacity: '1',
                    },
                },
            },
            MuiCardWrapper: {
                root: {
                    '&-header': {
                        '& .badge': {
                            background: colors.primary,
                            '&--free': {
                                background: colors.secondary,
                            },
                            '&--paid': {
                                background: colors.error,
                            },
                            '&--active': {
                                background: colors.primary,
                            },
                        },
                    },
                },
            },
            DrawerWrapper: {
                root: {
                    '& .bottomSection': {
                        '& .externalResources': {
                            '& .icon': {
                                fill: colors.primary,
                            },
                        },
                    },
                },
            },
            MuiMenuWrapper: {
                root: {
                    '& .menuContainer': {
                        '& .button': {
                            '&:hover, &:focus': {
                                '& .icon': {
                                    fill: colors.primary,
                                },
                            },
                            '&:active': {
                                '& .icon': {
                                    fill: colors.primary,
                                },
                            },
                        },
                    },
                },
            },
            MuiTableRow: {
                root: {
                    backgroundColor: '#fcfcfc',
                    '&:nth-child(even)': {
                        backgroundColor: '#ffffff',
                    },
                    '&$selected': {
                        border: 'solid',
                        borderColor: colors.primary,
                        backgroundColor: 'transparent',
                    },
                    '&$selected:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '&$hover:hover': {
                        opacity: 0.9,
                    },
                },
                head: {
                    backgroundColor: '#ffffff',
                },
            },
            MuiTableCell: {
                root: {
                    lineHeight: '34px',
                    padding: '17px 20px',
                    borderBottom: '1px solid #f6f6f6',
                    fontSize: '16px',
                    color: 'var(--milled-wine)',
                },
                head: {
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    color: 'var(--spun-pearl)',
                    fontWeight: 'bold',
                    lineHeight: '34px',
                    padding: '17px 15px',
                    letterSpacing: '2px',
                },
                body: {
                    color: 'var(--milled-wine)',
                },
            },
            LinkWrapper: {
                root: {
                    color: colors.primary,
                },
            },
            IconWrapper: {
                stroke: {
                    stroke: colors.primary,
                },
                fill: {
                    fill: colors.primary,
                },
            },
            PasswordField: {
                'bullet-on': {
                    fill: colors.primary,
                },
                'bullet-invalid': {
                    fill: colors.error,
                },
            },
            MemberSetupHelper: {
                root: {
                    '&-rowContainer': {
                        '&-iconWrapper': {
                            background: colors.primary,
                        },
                    },
                },
            },
            BoxSelect: {
                root: {
                    '&--checked': {
                        borderColor: colors.primary,
                    },
                },
            },
            DisplayFieldWrapper: {
                root: {
                    backgroundColor: colors.background,
                    '& > div': {
                        backgroundColor: colors.background,
                    },
                },
            },
            ApiKeyModal: {
                resetButton: {
                    backgroundColor: colors.error,
                    '&:hover, &:focus': {
                        backgroundColor: colors.error,
                    },
                },
            },
            Info: {
                root: {
                    backgroundColor: colors.background,
                },
            },
            MuiTabs: {
                root: {
                    marginBottom: '40px',
                },
                indicator: {
                    display: 'none',
                },
                flexContainer: {
                    borderBottom: '1px solid #DCDCDC',
                },
            },
            MuiTab: {
                root: {
                    backgroundColor: 'var(--ghost-white)',
                    border: '1px solid transparent',
                    borderBottom: '1px solid #DCDCDC',
                    borderRadius: '3px 3px 0 0',
                    fontSize: '16px',
                    position: 'relative',
                    marginBottom: '-1px',
                    textTransform: 'none',
                    minWidth: '100px',
                    '&$selected': {
                        border: '1px solid #DCDCDC',
                        borderBottomColor: 'var(--ghost-white)',
                    },
                },
            },
        },
    },
});

export default (colors) => ({
    base: BaseTheme(colors)
})
