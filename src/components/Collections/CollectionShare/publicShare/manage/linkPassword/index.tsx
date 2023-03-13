import { Box, Typography } from '@mui/material';
import { AppContext } from 'pages/_app';
import React, { useContext, useState } from 'react';
import { PublicURL, Collection, UpdatePublicURL } from 'types/collection';
import { PublicLinkSetPassword } from './setPassword';
import PublicShareSwitch from '../../switch';
import { useTranslation } from 'react-i18next';

interface Iprops {
    publicShareProp: PublicURL;
    collection: Collection;
    updatePublicShareURLHelper: (req: UpdatePublicURL) => Promise<void>;
}

export function ManageLinkPassword({
    collection,
    publicShareProp,
    updatePublicShareURLHelper,
}: Iprops) {
    const { t } = useTranslation();

    const appContext = useContext(AppContext);
    const [changePasswordView, setChangePasswordView] = useState(false);

    const closeConfigurePassword = () => setChangePasswordView(false);

    const handlePasswordChangeSetting = async () => {
        if (publicShareProp.passwordEnabled) {
            await confirmDisablePublicUrlPassword();
        } else {
            setChangePasswordView(true);
        }
    };

    const confirmDisablePublicUrlPassword = async () => {
        appContext.setDialogMessage({
            title: t('DISABLE_PASSWORD'),
            content: t('DISABLE_PASSWORD_MESSAGE'),
            close: { text: t('CANCEL') },
            proceed: {
                text: t('DISABLE'),
                action: () =>
                    updatePublicShareURLHelper({
                        collectionID: collection.id,
                        disablePassword: true,
                    }),
                variant: 'danger',
            },
        });
    };

    return (
        <>
            <Box>
                <Typography mb={0.5}> {t('LINK_PASSWORD_LOCK')}</Typography>
                <PublicShareSwitch
                    checked={!!publicShareProp?.passwordEnabled}
                    onChange={handlePasswordChangeSetting}
                />
            </Box>
            <PublicLinkSetPassword
                open={changePasswordView}
                onClose={closeConfigurePassword}
                collection={collection}
                publicShareProp={publicShareProp}
                updatePublicShareURLHelper={updatePublicShareURLHelper}
                setChangePasswordView={setChangePasswordView}
            />
        </>
    );
}
