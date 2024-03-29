import { Box, BoxProps, Button, ButtonProps, Tooltip, TooltipProps, useTheme } from '@mui/material'
import { IconType, IconSize } from '../types/iconType'
import React from 'react'

interface IconPickerItemProps {
  icon: IconType
  onClick: (icon: IconType) => void
  iconListContainerProps?: BoxProps
  iconTooltipProps?: TooltipProps
  iconButtonProps?: ButtonProps
  iconListIconSize?: IconSize
}

export function IconPickerItem({
  icon,
  onClick,
  iconListContainerProps,
  iconTooltipProps,
  iconButtonProps,
  iconListIconSize,
}: IconPickerItemProps) {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'inline-block', m: 1.5 }} {...iconListContainerProps}>
      <Tooltip title={icon} arrow {...iconTooltipProps}>
        <Button
          sx={{ color: theme.palette.text.primary }}
          onClick={() => !!onClick && onClick(icon)}
          {...iconButtonProps}
        >
          <i className={`fa ${icon} fa-${iconListIconSize}x`} />
        </Button>
      </Tooltip>
    </Box>
  )
}

export default IconPickerItem
