/*
Copyright 2024 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import React, { type JSX, type ReactNode } from "react";
import { type NumberSize, Resizable } from "re-resizable";
import { type Direction } from "re-resizable/lib/resizer";

import type ResizeNotifier from "../../utils/ResizeNotifier";

interface IProps {
    resizeNotifier: ResizeNotifier;
    collapsed?: boolean;
    workspacePanel?: JSX.Element;
    children: ReactNode;
    roomId: string;
}

export default class VerticalSplit extends React.Component<IProps> {
    private onResizeStart = (): void => {
        this.props.resizeNotifier.startResizing();
    };

    private onResize = (): void => {
        this.props.resizeNotifier.notifyRightHandleResized();
    };

    private get sizeSettingStorageKey(): string {
        return `mx_workspace_panel_size_${this.props.roomId}`;
    }

    private onResizeStop = (
        event: MouseEvent | TouchEvent,
        direction: Direction,
        elementRef: HTMLElement,
        delta: NumberSize,
    ): void => {
        const newSize = this.loadWorkspacePanelSize().width + delta.width;
        this.props.resizeNotifier.stopResizing();
        window.localStorage.setItem(this.sizeSettingStorageKey, newSize.toString());
    };

    private loadWorkspacePanelSize(): { height: string | number; width: number } {
        let workspaceSize = parseInt(window.localStorage.getItem(this.sizeSettingStorageKey)!, 10);

        if (isNaN(workspaceSize)) {
            workspaceSize = 350; // Default width of 350px
        }

        return {
            height: "100%",
            width: workspaceSize,
        };
    }

    public render(): React.ReactNode {
        const mainContent = React.Children.only(this.props.children);
        const workspacePanel = this.props.workspacePanel;

        const hasResizer = !this.props.collapsed && workspacePanel;

        let children;
        if (hasResizer) {
            children = (
                <Resizable
                    defaultSize={this.loadWorkspacePanelSize()}
                    minWidth={280}
                    maxWidth="50%"
                    enable={{
                        top: false,
                        right: false,
                        bottom: false,
                        left: true,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStart={this.onResizeStart}
                    onResize={this.onResize}
                    onResizeStop={this.onResizeStop}
                    className="mx_VerticalSplit_WorkspacePanel"
                    handleClasses={{ left: "mx_ResizeHandle--horizontal" }}
                >
                    {workspacePanel}
                </Resizable>
            );
        }

        return (
            <div className="mx_VerticalSplit">
                <div className="mx_VerticalSplit_MainContent">
                    {mainContent}
                </div>
                {children}
            </div>
        );
    }
}