// *****************************************************************************
// Copyright (C) 2021 logi.cals GmbH, EclipseSource and others.
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

import { expect, test } from '@playwright/test';
import { OpraizApp } from '../opraiz-app';
import { OpraizAppLoader } from '../opraiz-app-loader';
import { OpraizNotificationIndicator } from '../opraiz-notification-indicator';
import { OpraizProblemIndicator } from '../opraiz-problem-indicator';
import { OpraizStatusBar } from '../opraiz-status-bar';
import { OpraizToggleBottomIndicator } from '../opraiz-toggle-bottom-indicator';

test.describe('OPRAIZ IDECODE Status Bar', () => {

    let app: OpraizApp;
    let statusBar: OpraizStatusBar;

    test.beforeAll(async ({ playwright, browser }) => {
        app = await OpraizAppLoader.load({ playwright, browser });
        statusBar = app.statusBar;
    });

    test.afterAll(async () => {
        await app.page.close();
    });

    test('should show status bar', async () => {
        expect(await statusBar.isVisible()).toBe(true);
    });

    test('should contain status bar elements', async () => {
        const problemIndicator = await statusBar.statusIndicator(OpraizProblemIndicator);
        const notificationIndicator = await statusBar.statusIndicator(OpraizNotificationIndicator);
        const toggleBottomIndicator = await statusBar.statusIndicator(OpraizToggleBottomIndicator);
        expect(await problemIndicator.isVisible()).toBe(true);
        expect(await notificationIndicator.isVisible()).toBe(true);
        expect(await toggleBottomIndicator.isVisible()).toBe(true);
    });

});
