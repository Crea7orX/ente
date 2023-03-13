import { Box, Typography } from '@mui/material';
import { FlexWrapper } from 'components/Container';
import { GalleryContext } from 'pages/gallery';
import { AppContext } from 'pages/_app';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    createShareableURL,
    deleteShareableURL,
} from 'services/collectionService';
import { Collection, PublicURL } from 'types/collection';
import { handleSharingErrors } from 'utils/error/ui';
import PublicShareSwitch from './switch';
interface Iprops {
    collection: Collection;
    publicShareActive: boolean;
    setPublicShareProp: (value: PublicURL) => void;
}

export default function PublicShareControl({
    collection,
    publicShareActive,
    setPublicShareProp,
}: Iprops) {
    const { t } = useTranslation();

    const appContext = useContext(AppContext);
    const galleryContext = useContext(GalleryContext);
    const [sharableLinkError, setSharableLinkError] = useState(null);

    const createSharableURLHelper = async () => {
        try {
            appContext.startLoading();
            const publicURL = await createShareableURL(collection);
            setPublicShareProp(publicURL);
            await galleryContext.syncWithRemote(false, true);
        } catch (e) {
            const errorMessage = handleSharingErrors(e);
            setSharableLinkError(errorMessage);
        } finally {
            appContext.finishLoading();
        }
    };

    const disablePublicSharing = async () => {
        try {
            appContext.startLoading();
            await deleteShareableURL(collection);
            setPublicShareProp(null);
            await galleryContext.syncWithRemote(false, true);
        } catch (e) {
            const errorMessage = handleSharingErrors(e);
            setSharableLinkError(errorMessage);
        } finally {
            appContext.finishLoading();
        }
    };

    const confirmDisablePublicSharing = () => {
        appContext.setDialogMessage({
            title: t('DISABLE_PUBLIC_SHARING'),
            content: t('DISABLE_PUBLIC_SHARING_MESSAGE'),
            close: { text: t('CANCEL') },
            proceed: {
                text: t('DISABLE'),
                action: disablePublicSharing,
                variant: 'danger',
            },
        });
    };

    const handleCollectionPublicSharing = () => {
        setSharableLinkError(null);
        if (publicShareActive) {
            confirmDisablePublicSharing();
        } else {
            createSharableURLHelper();
        }
    };
    return (
        <Box mt={3}>
            <FlexWrapper>
                <FlexWrapper>{t('PUBLIC_SHARING')}</FlexWrapper>

                <PublicShareSwitch
                    color="accent"
                    sx={{
                        ml: 2,
                    }}
                    checked={publicShareActive}
                    onChange={handleCollectionPublicSharing}
                />
            </FlexWrapper>
            {sharableLinkError && (
                <Typography
                    variant="body2"
                    sx={{
                        color: (theme) => theme.palette.danger.main,
                        mt: 0.5,
                    }}>
                    {sharableLinkError}
                </Typography>
            )}
        </Box>
    );
}
