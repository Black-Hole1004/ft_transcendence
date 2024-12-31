import { j as e } from './index-CZOGhjFl.js';
import { H as d } from './Header-3Ry2d7os.js';
import { B as r } from './Button-5ZxX_AXj.js';
function s({ type: t, label: l, placeholder: a, id: i }) {
	return e.jsxs('div', {
		className: 'flex flex-col',
		children: [
			e.jsx('label', {
				htmlFor: i,
				className: 'font-regular text-light sections-title',
				children: l,
			}),
			e.jsx('input', {
				id: i,
				name: i,
				type: t,
				placeholder: a,
				className: `inputs border border-border rounded-lg bg-[rgb(183,170,156,8%)]
				placeholder:text-border placeholder:font-regular placeholders outline-none max-ms:w-[80%]`,
			}),
		],
	});
}
const m = () => (
	window.addEventListener('load', function () {
		var t = document.getElementById('resetButton');
		t.addEventListener('click', function () {
			for (
				var l = document.getElementsByTagName('form'), a = 0;
				a < l.length;
				a++
			)
				l[a].reset();
		});
	}),
	e.jsxs('div', {
		className: 'min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary',
		children: [
			e.jsx(d, {}),
			e.jsx('section', {
				className: 'flex justify-center',
				children: e.jsxs('div', {
					className:
						'settings max-tb:h-auto card-margin w-full lg:border-2 border border-primary rounded-3xl',
					children: [
						e.jsx('div', {
							className:
								'flex items-center card-header sections-ml',
							children: e.jsx('h1', {
								className:
									'font-dreamscape-sans text-primary leading-[1]',
								children: 'settings',
							}),
						}),
						e.jsx('div', { className: 'h-0.5 separators' }),
						e.jsxs('div', {
							className: `sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[80px] tb:gap-[20px] max-tb:gap-y-3`,
							children: [
								e.jsxs('div', {
									className:
										'font-regular sections-title tb:self-center self-start',
									children: [
										e.jsx('p', {
											className: 'text-primary',
											children: 'Profile Picture',
										}),
										e.jsx('p', {
											className: 'text-light',
											children:
												'Must be JPEG, PNG, or GIF and cannot exceed 5MB.',
										}),
									],
								}),
								e.jsxs('div', {
									className:
										'flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5',
									children: [
										e.jsx('div', {
											children: e.jsx('img', {
												src: './assets/images/moudrib.jpeg',
												className:
													'rounded-full border border-primary profile-pic',
												alt: '',
											}),
										}),
										e.jsxs('div', {
											className:
												'flex max-ms:flex-col lp:gap-2 gap-1',
											children: [
												e.jsx(r, {
													className:
														'rounded-md border-border font-regular buttons-text update-button',
													children:
														'Update Profile Picture',
												}),
												e.jsx(r, {
													className:
														'rounded-md border-border font-regular buttons-text remove-button',
													children: 'Remove',
												}),
											],
										}),
									],
								}),
							],
						}),
						e.jsx('div', { className: 'h-0.5 separators' }),
						e.jsxs('div', {
							className: `sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3`,
							children: [
								e.jsxs('div', {
									className:
										'font-regular sections-title tb:self-center self-start',
									children: [
										e.jsx('p', {
											className: 'text-primary',
											children: 'Personal Settings',
										}),
										e.jsx('p', {
											className: 'text-light',
											children:
												'Change identifying details for your account.',
										}),
									],
								}),
								e.jsx('div', {
									className: 'flex items-center',
									children: e.jsxs('form', {
										id: 'form1',
										className:
											'flex flex-col lp:gap-4 gap-2',
										children: [
											e.jsxs('div', {
												className:
													'flex flex-wrap xl:gap-12 lg:gap-4 gap-2',
												children: [
													e.jsx(s, {
														id: 'firstname',
														type: 'text',
														label: 'First Name',
														placeholder: 'Mouad',
													}),
													e.jsx(s, {
														id: 'lastname',
														type: 'text',
														label: 'Last Name',
														placeholder: 'Oudrib',
													}),
												],
											}),
											e.jsxs('div', {
												className:
													'flex flex-wrap xl:gap-12 lg:gap-4 gap-2',
												children: [
													e.jsx(s, {
														id: 'email',
														type: 'email',
														label: 'Email',
														placeholder:
															'transcendence@gmail.com',
													}),
													e.jsx(s, {
														id: 'phonenumber',
														type: 'text',
														label: 'Phone Number',
														placeholder:
															'+212611223344',
													}),
												],
											}),
											e.jsxs('div', {
												className:
													'flex flex-wrap xl:gap-12 lg:gap-4 gap-2',
												children: [
													e.jsx(s, {
														id: 'password',
														type: 'password',
														label: 'Current Password',
														placeholder:
															'•••••••••••••',
													}),
													e.jsx(s, {
														id: 'newpassword',
														type: 'password',
														label: 'New Password',
														placeholder:
															'••••••••••',
													}),
													e.jsx(s, {
														id: 'confirmpassword',
														type: 'password',
														label: 'Confirm New Password',
														placeholder:
															'••••••••••',
													}),
												],
											}),
										],
									}),
								}),
							],
						}),
						e.jsx('div', { className: 'h-0.5 separators' }),
						e.jsxs('div', {
							className: `sections-ml flex tb:flex-row flex-col items-center picture-section
						gap-5 max-tb:gap-y-3`,
							children: [
								e.jsx('div', {
									className:
										'font-regular sections-title tb:self-center self-start',
									children: e.jsx('p', {
										className: 'text-primary',
										children: 'Profile Settings',
									}),
								}),
								e.jsx('div', {
									className: 'flex items-center',
									children: e.jsx('form', {
										id: 'form2',
										className:
											'flex flex-col lp:gap-4 gap-2',
										children: e.jsxs('div', {
											className:
												'flex flex-wrap xl:gap-12 lg:gap-4 gap-2',
											children: [
												e.jsxs('div', {
													className:
														'flex flex-col gap-3',
													children: [
														e.jsx(s, {
															id: 'username',
															type: 'text',
															label: 'Username',
															placeholder:
																'mouad55',
														}),
														e.jsx(s, {
															id: 'displayname',
															type: 'text',
															label: 'Display Name',
															placeholder:
																'Arobase',
														}),
													],
												}),
												e.jsxs('div', {
													className: 'flex flex-col',
													children: [
														e.jsx('label', {
															htmlFor: '',
															className:
																'font-regular text-light sections-title',
															children: 'Bio',
														}),
														e.jsx('textarea', {
															name: '',
															id: '',
															placeholder:
																'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam, aperiam sit ratione officiis asperiores id quisquam, fugiat ipsa sed autem.',
															maxLength: '250',
															className: `bio-input font-regular border border-border rounded-lg bg-[rgb(183,170,156,8%)]
											max-ms:w-full outline-none placeholders placeholder:text-border`,
														}),
													],
												}),
											],
										}),
									}),
								}),
							],
						}),
						e.jsxs('div', {
							className:
								'flex justify-end save-button my-3 tb:gap-2 gap-1',
							children: [
								e.jsx(r, {
									id: 'resetButton',
									className:
										'rounded-md border-border font-regular buttons-text remove-button',
									children: 'Cancel',
								}),
								e.jsx(r, {
									className:
										'rounded-md border-border font-regular buttons-text remove-button',
									children: 'Save Changes',
								}),
							],
						}),
					],
				}),
			}),
		],
	})
);
export { m as default };
