/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { BlockQuotation } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

export default function QuoteEdit( {
	attributes,
	setAttributes,
	className,
	isSelected,
	insertBlocksAfter,
	clientId,
} ) {
	const { align, citation } = attributes;
	const isAncestorOfSelectedBlock = useSelect(
		( select ) => {
			const { hasSelectedInnerBlock } = select( 'core/block-editor' );
			return hasSelectedInnerBlock( clientId, true );
		},
		[ clientId ]
	);

export default function QuoteEdit( {
	attributes,
	setAttributes,
	isSelected,
	className,
	insertBlocksAfter,
	mergedStyle,
	clientId,
} ) {
	const { align, citation } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
		style: mergedStyle,
		children: ( ! RichText.isEmpty( citation ) ||
			isSelected ||
			isAncestorOfSelectedBlock ) && (
			<RichText
				identifier="citation"
				value={ citation }
				onChange={ ( nextCitation ) =>
					setAttributes( {
						citation: nextCitation,
					} )
				}
				__unstableMobileNoFocusOnMount
				placeholder={
					// translators: placeholder text used for the citation
					__( 'Write citation…' )
				}
				className="wp-block-quote__citation"
				textAlign={ align }
				__unstableOnSplitAtEnd={ () =>
					insertBlocksAfter( createBlock( 'core/paragraph' ) )
				}
			/>
		),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<BlockQuotation { ...innerBlocksProps } />
		</>
	);
}
