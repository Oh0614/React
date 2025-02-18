// components/sidebar/SidebarFooterEmail.js
import React from 'react';
import { Stack, Typography } from '@mui/material';

export default function SidebarFooterEmail({ email }) {
    return (
        <Stack
            direction="column"
            sx={{
                borderTop: '1px solid #ddd',
                padding: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="caption" color="text.secondary">
                {email ? `Logged in as: ${email}` : 'No email available'}
            </Typography>
        </Stack>
    );
}
