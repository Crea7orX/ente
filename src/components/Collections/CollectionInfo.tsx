import React from 'react';
import { Typography } from '@mui/material';
import constants from 'utils/strings/constants';
import { Collection, CollectionSummary } from 'types/collection';
import { PaddedSpaceBetweenFlex } from 'components/Collections/styledComponents';
import CollectionOptions from 'components/Collections/CollectionOptions';
import { SetCollectionNamerAttributes } from 'components/Collections/CollectionNamer';
import { ARCHIVE_SECTION, TRASH_SECTION } from 'constants/collection';

interface Iprops {
    activeCollection: Collection;
    collectionSummary: CollectionSummary;
    setCollectionNamerAttributes: SetCollectionNamerAttributes;
    showCollectionShareModal: () => void;
    redirectToAll: () => void;
}
export default function collectionInfo(props: Iprops) {
    if (!props.collectionSummary) {
        return <></>;
    }
    const {
        collectionSummary: { collectionAttributes, fileCount },
    } = props;

    return (
        <PaddedSpaceBetweenFlex>
            <div>
                <Typography variant="h5">
                    <strong>{collectionAttributes.name}</strong>
                </Typography>
                <Typography variant="subtitle1">
                    {fileCount} {constants.PHOTOS}
                </Typography>
            </div>
            {collectionAttributes.id !== ARCHIVE_SECTION &&
                collectionAttributes.id !== TRASH_SECTION && (
                    <CollectionOptions {...props} />
                )}
        </PaddedSpaceBetweenFlex>
    );
}
