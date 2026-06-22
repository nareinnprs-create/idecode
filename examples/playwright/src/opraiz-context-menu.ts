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

import { ElementHandle } from '@playwright/test';

import { OpraizApp } from './opraiz-app';
import { OpraizMenu } from './opraiz-menu';

export class OpraizContextMenu extends OpraizMenu {

    public static async openAt(app: OpraizApp, x: number, y: number): Promise<OpraizContextMenu> {
        await app.page.mouse.move(x, y);
        await app.page.mouse.click(x, y, { button: 'right' });
        return OpraizContextMenu.returnWhenVisible(app);
    }

    public static async open(app: OpraizApp, element: () => Promise<ElementHandle<SVGElement | HTMLElement>>): Promise<OpraizContextMenu> {
        const elementHandle = await element();
        await elementHandle.click({ button: 'right' });
        return OpraizContextMenu.returnWhenVisible(app);
    }

    private static async returnWhenVisible(app: OpraizApp): Promise<OpraizContextMenu> {
        const menu = new OpraizContextMenu(app);
        await menu.waitForVisible();
        return menu;
    }

}
