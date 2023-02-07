import {
  Box,
  Button,
  ButtonTypeMap,
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  ExtendButtonBase,
  FormControl,
  FormControlTypeMap,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  TextFieldProps,
  TooltipProps,
} from '@mui/material'
import { BoxTypeMap, Theme } from '@mui/system'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { ChangeEvent, useEffect, useState } from 'react'
import { iconList } from '../types/iconList'
import IconPickerItem from './IconPickerItem'
import { IconType, IconSize } from '../types/iconType'
import React from 'react'

interface IconPickerProps {
  value: IconType
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  showSearch?: boolean
  searchPlaceholder?: string
  formControlProps?: OverridableComponent<FormControlTypeMap<object, "div">>
  pickerInputLabel?: string
  dialogTitleText?: string
  dialogCancelText?: string
  dialogProps?: DialogProps
  dialogContentProps?: DialogContentProps
  dialogActionsProps?: DialogActionsProps
  searchFieldContainer?: OverridableComponent<BoxTypeMap<object, 'div', Theme>>
  searchFieldProps?: TextFieldProps
  cancelButtonProps?: ExtendButtonBase<ButtonTypeMap<object, 'button'>>
  iconListContainerProps?: OverridableComponent<BoxTypeMap<object, 'div', Theme>>
  iconTooltipProps?: TooltipProps
  iconButtonProps?: ExtendButtonBase<ButtonTypeMap<object, 'button'>>
  iconListIconSize?: IconSize
}

export function IconPicker({
  value,
  name,
  onChange,
  showSearch,
  searchPlaceholder,
  formControlProps,
  pickerInputLabel,
  dialogTitleText,
  dialogCancelText,
  dialogProps,
  dialogContentProps,
  dialogActionsProps,
  searchFieldContainer,
  searchFieldProps,
  cancelButtonProps,
  iconListContainerProps,
  iconTooltipProps,
  iconButtonProps,
  iconListIconSize,
}: IconPickerProps) {
  const [showIconListModal, setShowIconListModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [icon, setIcon] = useState<IconType>('fa-list')

  useEffect(() => {
    if (value && value.length > 0) {
      setIcon(value)
    }
  }, [])

  const handleClickIconPicker = () => {
    setShowIconListModal(!showIconListModal)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <FormControl
        variant="outlined"
        {...formControlProps}
      >
        <InputLabel>{pickerInputLabel}</InputLabel>
        <OutlinedInput
          type="text"
          value={icon}
          name={name}
          onChange={e => {
            !!onChange && onChange(e as ChangeEvent<HTMLInputElement>)
            setIcon(e.target.value as IconType)
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickIconPicker} edge="end">
                <i className={`fa ${icon}`} />
              </IconButton>
            </InputAdornment>
          }
          label={pickerInputLabel}
        />
      </FormControl>

      <Dialog
        open={showIconListModal}
        onClose={handleClickIconPicker}
        fullWidth={true}
        maxWidth={'sm'}
        {...dialogProps}
      >
        <DialogTitle>{dialogTitleText}</DialogTitle>
        <DialogContent {...dialogContentProps}>
          {showSearch && (
            <Box sx={{ mb: 1 }} {...searchFieldContainer}>
              <TextField
                size="small"
                variant="standard"
                placeholder={searchPlaceholder}
                fullWidth
                onChange={handleSearchChange}
                {...searchFieldProps}
              />
            </Box>
          )}
          {iconList
            .filter((i: string) => i.toLowerCase().includes(search?.toLowerCase()))
            .map((icon: IconType, index: number) => (
              <IconPickerItem
                key={index}
                icon={icon}
                iconListContainerProps={iconListContainerProps}
                iconTooltipProps={iconTooltipProps}
                iconButtonProps={iconButtonProps}
                iconListIconSize={iconListIconSize}
                onClick={(value: IconType) => {
                  setIcon(value)
                  setShowIconListModal(false)
                  setSearch('')
                }}
              />
            ))}
        </DialogContent>
        <DialogActions {...dialogActionsProps}>
          <Button
            onClick={() => {
              handleClickIconPicker()
              setSearch('')
            }}
            {...cancelButtonProps}
          >
            {dialogCancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

IconPicker.defaultProps = {
  showSearch: false,
  searchPlaceholder: 'Search',
  pickerInputLabel: 'Icon',
  dialogTitleText: 'FontAwesome Icon Picker',
  dialogCancelText: 'Cancel',
  pickerButtonIconSize: 2,
  iconListIconSize: 2,
  name: 'icon',
}
