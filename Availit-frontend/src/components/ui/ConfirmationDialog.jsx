import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmationDialog = ({ open, title, description, onConfirm, onCancel, confirmText = 'Yes', cancelText = 'No' }) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle className="flex items-center gap-2 text-red-600">
      <WarningAmberIcon className="text-yellow-500" />
      {title || 'Are you sure?'}
    </DialogTitle>
    <DialogContent>
      <div className="text-gray-700 text-base py-2">{description || 'This action cannot be undone.'}</div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="inherit" variant="outlined">{cancelText}</Button>
      <Button onClick={onConfirm} color="error" variant="contained">{confirmText}</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog; 