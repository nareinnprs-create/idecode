// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
import { OpraizExplorerView } from '../opraiz-explorer-view';

/**
 * Test the Theia welcome page from the getting-started package.
 */
test.describe('OPRAIZ IDECODE Welcome Page', () => {
    let app: OpraizApp;

    test.beforeAll(async ({ playwright, browser }) => {
        app = await OpraizAppLoader.load({ playwright, browser });
        await app.isMainContentPanelVisible();
    });

    test.afterAll(async () => {
        await app.page.close();
    });

    test('New File... entry should create a new file.', async () => {
        await app.page.getByRole('button', { name: 'New File...' }).click();
        const quickPicker = app.page.getByPlaceholder('Select File Type or Enter');
        await quickPicker.fill('testfile.txt');
        await quickPicker.press('Enter');
        await app.page.getByRole('button', { name: 'Create File' }).click();

        // check file in workspace exists
        const explorer = await app.openView(OpraizExplorerView);
        await explorer.refresh();
        await explorer.waitForVisibleFileNodes();
        expect(await explorer.existsFileNode('testfile.txt')).toBe(true);
    });
});
