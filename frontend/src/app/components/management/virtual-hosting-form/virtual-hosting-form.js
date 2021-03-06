/* Copyright (C) 2016 NooBaa */

import template from './virtual-hosting-form.html';
import ConnectableViewModel from 'components/connectable';
import { realizeUri } from 'utils/browser-utils';
import { keyByProperty } from 'utils/core-utils';
import ko from 'knockout';
import * as routes from 'routes';
import { requestLocation } from 'action-creators';

const sectionName = 'virutal-hosting';

class VirtualHostingFormViewModel extends ConnectableViewModel {
    dataReady = ko.observable();
    toggleUri = '';
    isExpanded = ko.observable();
    internalEndpoint = ko.observable();
    externalEndpoint = ko.observable();
    endpointProps = [
        {
            label: 'Cluster Internal name',
            value: this.internalEndpoint
        },
        {
            label: 'Cluster External name',
            value: this.externalEndpoint
        }
    ];


    selectState(state) {
        const { system, location } = state;
        return [
            system && system.s3Addresses,
            location
        ];
    }

    mapStateToProps(s3Addresses, location) {
        if (!s3Addresses) {
            ko.assignToProps(this, {
                dataReady: false
            });

        } else {
            const { system, section } = location.params;
            const toggleSection = section === sectionName ? undefined : sectionName;
            const toggleUri = realizeUri(routes.management, { system, tab: 'settings', section: toggleSection });
            const endpointByKind = keyByProperty(s3Addresses, 'kind', endpoint => endpoint.address);

            ko.assignToProps(this, {
                dataReady: true,
                toggleUri,
                isExpanded: section === sectionName,
                internalEndpoint: endpointByKind['INTERNAL'],
                externalEndpoint: endpointByKind['EXTERNAL']
            });
        }
    }

    onToggleSection() {
        this.dispatch(requestLocation(this.toggleUri));
    }
}

export default {
    viewModel: VirtualHostingFormViewModel,
    template: template
};
