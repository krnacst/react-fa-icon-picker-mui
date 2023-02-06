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
  TextField,
  TextFieldProps,
  TooltipProps,
} from '@mui/material'
import { BoxTypeMap, Theme } from '@mui/system'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { ChangeEvent, useState } from 'react'
import { iconList } from '../types/iconList'
import IconPickerItem from './IconPickerItem'
import { IconType, IconSize } from '../types/iconType'
import React from 'react'

interface IconPickerProps {
  value: IconType
  onChange?: (value: IconType) => void
  showSearch?: boolean
  searchPlaceholder?: string
  pickerButtonIconSize?: IconSize
  pickerButtonText?: string
  pickerButtonProps?: ExtendButtonBase<ButtonTypeMap<unknown, 'button'>>
  dialogTitleText?: string
  dialogCancelText?: string
  dialogProps?: DialogProps
  dialogContentProps?: DialogContentProps
  dialogActionsProps?: DialogActionsProps
  searchFieldContainer?: OverridableComponent<BoxTypeMap<unknown, 'div', Theme>>
  searchFieldProps?: TextFieldProps
  cancelButtonProps?: ExtendButtonBase<ButtonTypeMap<unknown, 'button'>>
  iconListContainerProps?: OverridableComponent<BoxTypeMap<unknown, 'div', Theme>>
  iconTooltipProps?: TooltipProps
  iconButtonProps?: ExtendButtonBase<ButtonTypeMap<unknown, 'button'>>
  iconListIconSize?: IconSize
}

export function IconPicker({
  value,
  onChange,
  showSearch,
  searchPlaceholder,
  pickerButtonIconSize,
  pickerButtonText,
  pickerButtonProps,
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

  const handleClickIconPicker = () => {
    setShowIconListModal(!showIconListModal)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <Button onClick={handleClickIconPicker} {...pickerButtonProps}>
        {value ? <i className={`fa ${value} fa-${pickerButtonIconSize}x`} /> : pickerButtonText}
      </Button>

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
                  !!onChange && onChange(value)
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
  pickerButtonText: 'Icon',
  dialogTitleText: 'FontAwesome Icon Picker',
  dialogCancelText: 'Cancel',
  pickerButtonIconSize: 2,
  iconListIconSize: 2,
}
