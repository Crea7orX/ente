import { Legend } from './legend';
import { FamilyUsageProgressBar } from './progressBar';
import { Box, Stack, Typography } from '@mui/material';
import { SpaceBetweenFlex } from 'components/Container';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Iprops {
    userUsage: number;
    totalUsage: number;
    fileCount: number;
    totalStorage: number;
}

export function FamilyUsageSection({
    userUsage,
    totalUsage,
    fileCount,
    totalStorage,
}: Iprops) {
    const { t } = useTranslation();
    return (
        <Box width="100%">
            <FamilyUsageProgressBar
                totalUsage={totalUsage}
                userUsage={userUsage}
                totalStorage={totalStorage}
            />
            <SpaceBetweenFlex
                sx={{
                    marginTop: 1.5,
                }}>
                <Stack direction={'row'} spacing={1.5}>
                    <Legend label={t('YOU')} color="text.primary" />
                    <Legend label={t('FAMILY')} color="text.secondary" />
                </Stack>
                <Typography variant="caption" fontWeight={'bold'}>
                    {t('PHOTO_COUNT', { count: fileCount ?? 0 })}
                </Typography>
            </SpaceBetweenFlex>
        </Box>
    );
}
