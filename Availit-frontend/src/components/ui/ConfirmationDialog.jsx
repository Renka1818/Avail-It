import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmationDialog = ({ open, title, description, onConfirm, onCancel, confirmText = 'Yes', cancelText = 'No' }) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle className="flex items-center gap-2 text-red-600 text-lg sm:text-xl">
      <WarningAmberIcon className="text-yellow-500" />
      {title || 'Are you sure?'}
    </DialogTitle>
    <DialogContent className="p-2 sm:p-4">
      <div className="text-gray-700 text-base sm:text-lg py-2">{description || 'This action cannot be undone.'}</div>
    </DialogContent>
    <DialogActions className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
      <Button onClick={onCancel} color="inherit" variant="outlined" className="w-full sm:w-auto min-h-[44px] min-w-[100px] text-base">{cancelText}</Button>
      <Button onClick={onConfirm} color="error" variant="contained" className="w-full sm:w-auto min-h-[44px] min-w-[100px] text-base">{confirmText}</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog; 