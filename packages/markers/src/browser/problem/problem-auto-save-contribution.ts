// *****************************************************************************
// Copyright (C) 2026 Safi Seid-Ahmad, K2view.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

import { inject, injectable, postConstruct } from '@opraiz/core/shared/inversify';
import { Emitter, Event } from '@opraiz/core';
import { SaveErrorChecker } from '@opraiz/core/lib/browser/saveable-service';
import { DiagnosticSeverity } from '@opraiz/core/shared/vscode-languageserver-protocol';
import { ProblemManager } from './problem-manager';
import URI from '@opraiz/core/lib/common/uri';

@injectable()
export class ProblemAutoSaveContribution implements SaveErrorChecker {

    @inject(ProblemManager)
    protected readonly problemManager: ProblemManager;

    protected readonly onDidErrorStateChangeEmitter = new Emitter<void>();

    get onDidErrorStateChange(): Event<void> {
        return this.onDidErrorStateChangeEmitter.event;
    }

    @postConstruct()
    protected init(): void {
        this.problemManager.onDidChangeMarkers(() => {
            this.onDidErrorStateChangeEmitter.fire();
        });
    }

    hasErrors(uri: URI): boolean {
        const markers = this.problemManager.findMarkers({ uri });
        return markers.some(marker => marker.data.severity === DiagnosticSeverity.Error);
    }
}
