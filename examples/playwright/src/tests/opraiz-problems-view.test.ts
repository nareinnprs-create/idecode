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
import { OpraizProblemsView } from '../opraiz-problem-view';

test.describe('OPRAIZ IDECODE Problems View', () => {

    let app: OpraizApp;

    test.beforeAll(async ({ playwright, browser }) => {
        app = await OpraizAppLoader.load({ playwright, browser });
    });

    test.afterAll(async () => {
        await app.page.close();
    });

    test('should be visible and active after being opened', async () => {
        const problemsView = await app.openView(OpraizProblemsView);
        expect(await problemsView.isTabVisible()).toBe(true);
        expect(await problemsView.isDisplayed()).toBe(true);
        expect(await problemsView.isActive()).toBe(true);
    });

    test("should be opened at the bottom and have the title 'Problems'", async () => {
        const problemsView = await app.openView(OpraizProblemsView);
        expect(await problemsView.isInSidePanel()).toBe(false);
        expect(await problemsView.side()).toBe('bottom');
        expect(await problemsView.title()).toBe('Problems');
    });

    test('should be closable', async () => {
        const problemsView = await app.openView(OpraizProblemsView);
        expect(await problemsView.isClosable()).toBe(true);

        await problemsView.close();
        expect(await problemsView.isTabVisible()).toBe(false);
        expect(await problemsView.isDisplayed()).toBe(false);
        expect(await problemsView.isActive()).toBe(false);
    });

    test("should not throw an error if 'close' is called twice", async () => {
        const problemsView = await app.openView(OpraizProblemsView);
        await problemsView.close();
        await problemsView.close();
    });

});
