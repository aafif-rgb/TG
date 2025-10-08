class ProductDetails {
    constructor() {
        this.mainImage = document.getElementById('ProductMainImage');
        this.thumbnails = document.querySelectorAll('.product-details__thumbnail');
        this.variantInput = document.getElementById('VariantId');
        this.optionButtons = document.querySelectorAll('.product-details__option-value');
        this.quantityInput = document.getElementById('Quantity');
        this.quantityButtons = document.querySelectorAll('.product-details__quantity-btn');
        this.textOverlay = document.getElementById('TextOverlay');
        this.customText = document.getElementById('CustomText');
        this.monogramFirst = document.getElementById('MonogramFirst');
        this.monogramMiddle = document.getElementById('MonogramMiddle');
        this.monogramLast = document.getElementById('MonogramLast');
        this.customTextSection = document.getElementById('CustomTextSection');
        this.monogramSection = document.getElementById('MonogramSection');
        this.textToggleButtons = document.querySelectorAll('.product-details__toggle-btn');
        this.fontButtons = document.querySelectorAll('.product-details__option-value[data-font]');
        this.colorButtons = document.querySelectorAll('.product-details__option-value[data-color]');

        // Form property inputs
        this.textTypeInput = document.getElementById('TextType');
        this.textPropertyInput = document.getElementById('TextProperty');
        this.fontPropertyInput = document.getElementById('FontProperty');
        this.colorPropertyInput = document.getElementById('ColorProperty');
        this.colorCodePropertyInput = document.getElementById('ColorCodeProperty');
        this.printPropertyInput = document.getElementById('PrintProperty');

        // Track current text mode and color
        this.currentTextMode = 'custom';
        this.currentColor = '#2E2E2E';

        // Track selected options
        this.selectedOptions = {};

        // Parse product data (variants + option names)
        try {
            const dataEl = document.getElementById('ProductData');
            const product = dataEl ? JSON.parse(dataEl.textContent) : null;
            this.productVariants = product?.variants || [];
            this.productOptionNames = (product?.options || []).map(name => this.toHandle(name));
        } catch (_) {
            this.productVariants = [];
            this.productOptionNames = [];
        }

        this.initializeEventListeners();

        // Initialize selected font label on load
        this.initializeSelectedFontLabel();

        // Initialize selected color label on load
        this.initializeSelectedColorLabel();
    }

    toHandle(str) {
        if (!str) return '';
        return String(str)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    getVariantOptionsMap(variant) {
        const optionsMap = {};
        for (let i = 0; i < this.productOptionNames.length; i++) {
            const optName = this.productOptionNames[i];
            const value = variant[`option${i + 1}`];
            if (optName && value != null) optionsMap[optName] = this.toHandle(value);
        }
        return optionsMap;
    }

    initializeEventListeners() {
        // Thumbnail image switching (no fades to avoid blur)
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => this.switchImage(e));
        });

        // Variant selection
        this.optionButtons.forEach(button => {
            button.addEventListener('click', (e) => this.selectVariant(e));
        });

        // Quantity controls
        this.quantityButtons.forEach(button => {
            button.addEventListener('click', (e) => this.changeQuantity(e));
        });

        // Quantity input validation
        this.quantityInput.addEventListener('input', (e) => this.validateQuantity(e));

        // Text type toggle
        this.textToggleButtons.forEach(button => {
            button.addEventListener('click', (e) => this.toggleTextType(e));
        });

        // Custom text overlay
        if (this.customText) {
            this.customText.addEventListener('input', (e) => this.updateTextOverlay(e));
        }

        // Monogram inputs
        if (this.monogramFirst) {
            this.monogramFirst.addEventListener('input', () => this.updateMonogram());
            this.monogramMiddle.addEventListener('input', () => this.updateMonogram());
            this.monogramLast.addEventListener('input', () => this.updateMonogram());
        }

        // Font selection
        this.fontButtons.forEach(button => {
            button.addEventListener('click', (e) => this.selectFont(e));
        });

        // Color selection
        this.colorButtons.forEach(button => {
            button.addEventListener('click', (e) => this.selectColor(e));
        });
    }

    initializeSelectedFontLabel() {
        // Find the active font button or fallback to first
        let activeFontBtn = document.querySelector('.product-details__option-value[data-font].active');
        if (!activeFontBtn) {
            activeFontBtn = document.querySelector('.product-details__option-value[data-font]');
        }
        if (!activeFontBtn) return;

        const fakeEvent = { preventDefault: () => { }, stopPropagation: () => { }, currentTarget: activeFontBtn };
        // Reuse selectFont to set label + font property consistently
        this.selectFont(fakeEvent);
    }

    initializeSelectedColorLabel() {
        let activeColorBtn = document.querySelector('.product-details__option-value[data-color].active');
        if (!activeColorBtn) {
            activeColorBtn = document.querySelector('.product-details__option-value[data-color]');
        }
        if (!activeColorBtn) return;

        const labelEl = document.querySelector('.product-details__selected-color');
        if (!labelEl) return;

        const colorLabel = activeColorBtn.dataset.colorLabel || activeColorBtn.querySelector('.product-details__option-text')?.textContent || '';
        labelEl.textContent = colorLabel;

        // Sync hidden inputs
        if (this.colorPropertyInput) this.colorPropertyInput.value = colorLabel;
        if (this.colorCodePropertyInput) this.colorCodePropertyInput.value = activeColorBtn.dataset.color;
    }

    switchImage(event) {
        const thumbnail = event.currentTarget;
        const imageUrl = thumbnail.dataset.imageUrl;
        const imageAlt = thumbnail.dataset.imageAlt;

        // Update main image (no opacity tween to prevent blur)
        this.mainImage.src = imageUrl;
        this.mainImage.alt = imageAlt;

        // Update active thumbnail
        this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');

        // No opacity changes to avoid browser resampling blur
    }

    selectVariant(event) {
        const button = event.currentTarget;
        const optionName = button.dataset.option;
        const optionValue = button.dataset.value;
        const valueLabel = button.dataset.valueLabel;
        const variantId = button.dataset.variantId;

        // Update selected value display
        const selectedValueDisplay = document.querySelector(`.product-details__selected-value[data-for="${optionName}"]`);
        if (selectedValueDisplay) {
            selectedValueDisplay.textContent = valueLabel;
        }

        if (button.disabled) return;

        // Update selected options tracking
        this.selectedOptions[optionName] = optionValue;

        // If color selected, auto-apply the first available print for that color
        if (optionName === 'color') this.applyFirstPrintForColor(optionValue);

        // Find the correct variant based on all selected options
        const matchingVariant = this.findMatchingVariant();

        if (matchingVariant) {
            // Update variant ID
            this.variantInput.value = matchingVariant.id;

            // Update active state for option group
            const optionGroup = button.closest('.product-details__option');
            optionGroup.querySelectorAll('.product-details__option-value').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Update product image based on the selected combination
            this.updateVariantImage(matchingVariant.id);

            // Update price and availability
            this.updateVariantInfo(matchingVariant.id);

            // Add selection feedback
            this.addSelectionFeedback(button);
        } else {
            // No matching variant found - this shouldn't happen with proper Shopify setup
            console.warn('No matching variant found for options:', this.selectedOptions);
        }
    }

    applyFirstPrintForColor(colorHandle) {
        // Determine which option index is print
        const printIndex = this.productOptionNames.indexOf('print');
        const colorIndex = this.productOptionNames.indexOf('color');
        if (colorIndex === -1 || printIndex === -1) return;

        // Find first variant that matches selected color
        const firstForColor = this.productVariants.find(v => {
            const opts = this.getVariantOptionsMap(v);
            return opts['color'] === colorHandle;
        });
        if (!firstForColor) return;

        // Set selected print to that variant's print value
        const targetPrintHandle = this.getVariantOptionsMap(firstForColor)['print'];
        if (!targetPrintHandle) return;
        this.selectedOptions['print'] = targetPrintHandle;

        // Reflect UI active state for print group
        const printGroup = document.querySelector('.product-details__option-values .product-details__option-value[data-option="print"]')?.closest('.product-details__option');
        const printButtons = document.querySelectorAll('.product-details__option-value[data-option="print"]');
        printButtons.forEach(btn => btn.classList.remove('active'));
        const matchBtn = Array.from(printButtons).find(btn => btn.dataset.value === targetPrintHandle);
        if (matchBtn) matchBtn.classList.add('active');
    }

    findMatchingVariant() {
        // Use server variant data for reliable matching
        const keys = Object.keys(this.selectedOptions);
        if (keys.length === 0) return null;

        for (const v of this.productVariants) {
            const opts = this.getVariantOptionsMap(v);
            const matches = keys.every(k => opts[k] === this.selectedOptions[k]);
            if (matches) return { id: String(v.id) };
        }
        return null;
    }

    selectColor(event) {
        event.preventDefault();
        event.stopPropagation();

        const button = event.currentTarget;
        const color = button.dataset.color;
        const colorLabel = button.dataset.colorLabel || button.querySelector('.product-details__option-text').textContent;

        if (!this.textOverlay) return;

        // Update active state
        this.colorButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Store current color
        this.currentColor = color;

        // Update form properties
        if (this.colorPropertyInput) {
            this.colorPropertyInput.value = colorLabel;
        }
        if (this.colorCodePropertyInput) {
            this.colorCodePropertyInput.value = color;
        }

        // Update selected color label display
        const selectedColorDisplay = document.querySelector('.product-details__selected-color');
        if (selectedColorDisplay) {
            selectedColorDisplay.textContent = colorLabel;
        }

        // Apply color to text overlay
        if (this.currentTextMode === 'monogram') {
            // Apply to each monogram character
            const chars = this.textOverlay.querySelectorAll('.monogram-char');
            chars.forEach(char => {
                char.style.color = color;
            });
        } else {
            // Apply to entire text overlay
            this.textOverlay.style.color = color;
        }

        // Add selection feedback
        this.addSelectionFeedback(button);
    }

    addSelectionFeedback(button) {
        // Add a subtle animation to show the selection
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    updateVariantImage(variantId) {
        // Prefer server-provided image map from hidden JSON
        try {
            if (!this.productVariants) {
                const el = document.getElementById('ProductData');
                this.productVariants = el ? JSON.parse(el.textContent).variants : [];
            }
        } catch (_) {
            this.productVariants = [];
        }

        const variant = (this.productVariants || []).find(v => String(v.id) === String(variantId));
        const src = variant?.featured_image?.src || variant?.image?.src || null;
        const alt = variant?.title || this.mainImage.alt;

        if (src) {
            // Use 1200px width for crisper image; Shopify auto-derives sizes via params
            const finalSrc = src.includes('?') ? `${src}&width=1200` : `${src}?width=1200`;
            this.mainImage.src = finalSrc;
            this.mainImage.alt = alt;
            return;
        }

        // Fallback to current src (no blur animations)
    }

    findVariantImage(variantId, optionValue) {
        // This would typically access Shopify's variant data
        // For now, we'll return null and use the fallback method
        return null;
    }

    findMatchingImage(optionValue) {
        // Look through all product images to find one that matches the variant
        const allImages = document.querySelectorAll('.product-details__thumbnail img');
        const optionValueLower = optionValue.toLowerCase();

        for (const img of allImages) {
            const altText = img.alt.toLowerCase();
            const src = img.src;

            // Check if the image alt text or src contains the variant value
            if (altText.includes(optionValueLower) || src.includes(optionValueLower)) {
                return { src: src, alt: img.alt };
            }
        }

        return null;
    }

    updateVariantInfo(variantId) {
        // This would typically update price, availability, etc.
        // For now, we'll just add a subtle feedback animation
        const addToCartButton = document.querySelector('.product-details__add-to-cart');
        if (addToCartButton) {
            addToCartButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                addToCartButton.style.transform = 'scale(1)';
            }, 200);
        }
    }

    changeQuantity(event) {
        const action = event.currentTarget.dataset.action;
        const currentValue = parseInt(this.quantityInput.value) || 1;

        if (action === 'increase') {
            this.quantityInput.value = currentValue + 1;
        } else if (action === 'decrease' && currentValue > 1) {
            this.quantityInput.value = currentValue - 1;
        }

        // Add feedback animation
        event.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            event.currentTarget.style.transform = 'scale(1)';
        }, 150);
    }

    validateQuantity(event) {
        const value = parseInt(event.target.value);
        if (value < 1) {
            event.target.value = 1;
        }
    }

    updateTextOverlay(event) {
        if (!this.textOverlay) return;

        const text = event.target.value.trim();
        this.textOverlay.textContent = text;
        this.textOverlay.classList.remove('product-details__text-overlay--monogram');

        // Update form property
        if (this.textPropertyInput) {
            this.textPropertyInput.value = text;
        }

        // Add a subtle animation
        this.textOverlay.style.transform = 'translate(-50%, -50%) scale(1.05)';
        setTimeout(() => {
            this.textOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 150);
    }

    toggleTextType(event) {
        const button = event.currentTarget;
        const textType = button.dataset.textType;

        // Update active state
        this.textToggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update text type property
        if (this.textTypeInput) {
            this.textTypeInput.value = textType === 'custom' ? 'Custom Text' : 'Monogram';
        }

        // Show/hide appropriate section
        if (textType === 'custom') {
            this.customTextSection.style.display = 'block';
            this.monogramSection.style.display = 'none';
            this.currentTextMode = 'custom';
            // Clear monogram inputs
            if (this.monogramFirst) {
                this.monogramFirst.value = '';
                this.monogramMiddle.value = '';
                this.monogramLast.value = '';
            }
            // Clear monogram property
            if (this.textPropertyInput) {
                this.textPropertyInput.value = this.customText ? this.customText.value : '';
            }
            // Trigger text update if there's existing text
            if (this.customText && this.customText.value) {
                this.updateTextOverlay({ target: this.customText });
            } else {
                this.textOverlay.textContent = '';
                this.textOverlay.classList.remove('product-details__text-overlay--monogram');
            }
        } else {
            this.customTextSection.style.display = 'none';
            this.monogramSection.style.display = 'block';
            this.currentTextMode = 'monogram';
            // Clear custom text
            if (this.customText) {
                this.customText.value = '';
            }
            // Update monogram if there's existing input
            if (this.monogramFirst && (this.monogramFirst.value || this.monogramMiddle.value || this.monogramLast.value)) {
                this.updateMonogram();
            } else {
                this.textOverlay.textContent = '';
                this.textOverlay.classList.remove('product-details__text-overlay--monogram');
            }
        }
    }

    updateMonogram() {
        if (!this.textOverlay) return;

        const first = this.monogramFirst.value.trim().toUpperCase();
        const middle = this.monogramMiddle.value.trim().toUpperCase();
        const last = this.monogramLast.value.trim().toUpperCase();

        // Create monogram HTML with styled middle character
        this.textOverlay.innerHTML = `
            <span class="monogram-char">${first}</span>
            <span class="monogram-char monogram-char--large">${middle}</span>
            <span class="monogram-char">${last}</span>
        `;
        this.textOverlay.classList.add('product-details__text-overlay--monogram');

        // Update form property with combined monogram
        if (this.textPropertyInput) {
            this.textPropertyInput.value = `${first}${middle}${last}`;
        }

        // Add animation
        this.textOverlay.style.transform = 'translate(-50%, -50%) scale(1.05)';
        setTimeout(() => {
            this.textOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 150);
    }

    selectFont(event) {
        event.preventDefault();
        event.stopPropagation();

        const button = event.currentTarget;
        const font = button.dataset.font;

        if (!this.textOverlay) return;

        // Update active state
        this.fontButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        let fontFamily;
        let fontLabel;
        // Determine font family
        switch (font) {
            case 'single-romanesque':
                fontFamily = '"SingleRomanesque", serif';
                fontLabel = 'Romanesque';
                break;
            case 'buket-roman':
                fontFamily = '"BuketRoman", serif';
                fontLabel = 'Buket Roman';
                break;
            case 'harman-script':
                fontFamily = '"HarmanScript", cursive';
                fontLabel = 'Harman Script';
                break;
            case 'harman-western':
                fontFamily = '"HarmanWestern", serif';
                fontLabel = 'Harman Western';
                break;
            case 'janda-as-long':
                fontFamily = '"JandaAsLongAsYouLoveMe", cursive';
                fontLabel = 'Janda Script';
                break;
            case 'petunia-script':
                fontFamily = '"PetuniaScript", cursive';
                fontLabel = 'Petunia Script';
                break;
            default:
                fontFamily = '"SingleRomanesque", serif';
                fontLabel = 'Romanesque';
                break;
        }

        // Update form property
        if (this.fontPropertyInput) {
            this.fontPropertyInput.value = fontLabel;
        }

        // Update selected font display
        const selectedFontDisplay = document.querySelector('.product-details__selected-font');
        if (selectedFontDisplay) {
            selectedFontDisplay.textContent = fontLabel;
        }

        // Apply font to text overlay
        if (this.currentTextMode === 'monogram') {
            // Apply to each monogram character
            const chars = this.textOverlay.querySelectorAll('.monogram-char');
            chars.forEach(char => {
                char.style.fontFamily = fontFamily;
            });
        } else {
            // Apply to entire text overlay
            this.textOverlay.style.fontFamily = fontFamily;
        }

        // Add mobile positioning class for script fonts
        this.textOverlay.classList.remove('script-font-mobile');
        if (font === 'harman-script' || font === 'janda-as-long' || font === 'petunia-script') {
            this.textOverlay.classList.add('script-font-mobile');
        }

        // Add selection feedback
        this.addSelectionFeedback(button);
    }
}

// Initialize when DOM is loaded
// Handle card message
const handleCardMessage = () => {
    const cardMessageInput = document.getElementById('CardMessage');
    const cardMessageProperty = document.getElementById('CardMessageProperty');

    if (cardMessageInput && cardMessageProperty) {
        cardMessageInput.addEventListener('input', (e) => {
            cardMessageProperty.value = e.target.value.trim();
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    handleCardMessage();
    new ProductDetails();

    // Add entrance animations
    const title = document.querySelector('.product-details__title');
    if (title) {
        setTimeout(() => {
            title.classList.add('animate');
        }, 300);
    }
});
