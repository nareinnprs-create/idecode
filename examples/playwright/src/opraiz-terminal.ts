// *****************************************************************************
// Copyright (C) 2023 EclipseSource and others.
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
import { OpraizContextMenu } from './opraiz-context-menu';
import { OpraizMenu } from './opraiz-menu';
import { OpraizView } from './opraiz-view';

export class OpraizTerminal extends OpraizView {

    constructor(tabId: string, app: OpraizApp) {
        super({
            tabSelector: `#shell-tab-terminal-${getTerminalId(tabId)}`,
            viewSelector: `#terminal-${getTerminalId(tabId)}`
        }, app);
    }

    async submit(text: string): Promise<void> {
        await this.write(text);
        const input = await this.waitForInputArea();
        await input.press('Enter');
    }

    async write(text: string): Promise<void> {
        await this.activate();
        const input = await this.waitForInputArea();
        await input.fill(text);
    }

    async contents(): Promise<string> {
        await this.activate();
        await (await this.openContextMenu()).clickMenuItem('Select All');
        await (await this.openContextMenu()).clickMenuItem('Copy');
        return this.page.evaluate('navigator.clipboard.readText()');
    }

    protected async openContextMenu(): Promise<OpraizMenu> {
        await this.activate();
        return OpraizContextMenu.open(this.app, () => this.waitForVisibleView());
    }

    protected async waitForInputArea(): Promise<ElementHandle<SVGElement | HTMLElement>> {
        const view = await this.waitForVisibleView();
        return view.waitForSelector('.xterm-helper-textarea');
    }

    protected async waitForVisibleView(): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return this.page.waitForSelector(this.viewSelector, { state: 'visible' });
    }

}

function getTerminalId(tabId: string): string {
    return tabId.substring(tabId.lastIndexOf('-') + 1);
}
